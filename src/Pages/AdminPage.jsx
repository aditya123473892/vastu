import React, { useState, useEffect, useRef } from "react";
import { imageService, useImages } from "../services/api";

const AdminPage = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const {
    images,
    loading,
    error: imagesError,
    fetchImages,
  } = useImages({ category: categoryFilter });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "unbuilt",
    project_id: "",
    images: [],
  });
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [viewMode, setViewMode] = useState("grouped");
  const [selectedProject, setSelectedProject] = useState(null);
  const [shareLink, setShareLink] = useState("");
  const [activeSection, setActiveSection] = useState("upload");
  const [modalConfig, setModalConfig] = useState(null);
  const [editingMode, setEditingMode] = useState("project"); // "project" or "individual"
  const [projectImages, setProjectImages] = useState([]);
  const [editingImageIndex, setEditingImageIndex] = useState(null);
  const shareLinkRef = useRef(null);

  // Fetch projects (mock data for now - replace with actual API call)
  useEffect(() => {
    setProjects([
      { id: 1, name: "Project 1" },
      { id: 2, name: "Project 2" },
      { id: 3, name: "Project 3" },
      { id: 4, name: "Project 4" },
      { id: 5, name: "Project 5" },
      { id: 6, name: "Project 6" },
      { id: 7, name: "Project 7" },
      { id: 8, name: "Project 8" },
      { id: 9, name: "Project 9" },
      { id: 10, name: "Project 10" },
      { id: 11, name: "Project 11" },
      { id: 12, name: "Project 12" },
      { id: 13, name: "Project 13" },
      { id: 14, name: "Project 14" },
      { id: 15, name: "Project 15" },
      { id: 16, name: "Project 16" },
      { id: 17, name: "Project 17" },
      { id: 18, name: "Project 18" },
      { id: 19, name: "Project 19" },
      { id: 20, name: "Project 20" },
      { id: 21, name: "Project 21" },
      { id: 22, name: "Project 22" },
      { id: 23, name: "Project 23" },
      { id: 24, name: "Project 24" },
    ]);
  }, []);

  // Group images by title
  const groupedImages = images.reduce((acc, img) => {
    if (!acc[img.title]) {
      acc[img.title] = [];
    }
    acc[img.title].push(img);
    return acc;
  }, {});

  // Convert to array for rendering
  const projectsByTitle = Object.entries(groupedImages);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Clear any previous errors
      setError(null);
      
      // Check file size limit (5MB per image)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      const oversizedFiles = files.filter(file => file.size > maxSize);
      
      if (oversizedFiles.length > 0) {
        setError(`Some files exceed 5MB limit: ${oversizedFiles.map(f => f.name).join(', ')}`);
        return;
      }

      // For editing mode, only allow single file selection
      if (isEditing) {
        setFormData({
          ...formData,
          images: [files[0]], // Only take the first file for editing
        });

        // Generate preview URL for the single file
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls([reader.result]);
        };
        reader.readAsDataURL(files[0]);
        return;
      }

      // For upload mode, handle multiple files
      // Check project image limit
      if (formData.project_id && files.length > 5) {
        setError(`You can only upload up to 5 images per project. You selected ${files.length} images.`);
        return;
      }

      // Check if adding these files would exceed the project limit
      const currentImageCount = formData.images.length;
      if (formData.project_id && (currentImageCount + files.length) > 5) {
        setError(`Adding ${files.length} images would exceed the 5 image limit for this project. You currently have ${currentImageCount} images selected.`);
        return;
      }

      // If there are already images selected, append new ones instead of replacing
      const existingImages = formData.images || [];
      const allImages = [...existingImages, ...files];
      
      setFormData({
        ...formData,
        images: allImages,
      });

      // Generate preview URLs for new files only
      const newPreviewUrls = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviewUrls.push(reader.result);
          if (newPreviewUrls.length === files.length) {
            // Combine existing preview URLs with new ones
            setPreviewUrls([...previewUrls, ...newPreviewUrls]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);

      if (formData.project_id) {
        formDataToSend.append("project_id", formData.project_id);
      }

      if (isEditing) {
        // Update metadata
        await imageService.updateImage(currentImageId, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          project_id: formData.project_id || null,
        });

        // Update image file if a new file was selected
        if (formData.images && formData.images.length > 0) {
          const imageFormData = new FormData();
          imageFormData.append("image", formData.images[0]);
          await imageService.updateImageFile(currentImageId, imageFormData);
        }

        setSuccessMessage("Image updated successfully!");
      } else {
        if (!formData.images || formData.images.length === 0) {
          throw new Error("Please select at least one image to upload");
        }

        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });

        const result = await imageService.createImage(formDataToSend);
        setSuccessMessage(
          `${result.images.length} image(s) uploaded successfully!`
        );
      }

      resetForm();
      fetchImages();
    } catch (err) {
      setError("Error: " + err.message);
      console.error("Error submitting form:", err);
    }
  };

  // Handle edit button click for a project (by title)
  const handleEditProject = (title) => {
    const projectImages = groupedImages[title];
    if (projectImages && projectImages.length > 0) {
      const firstImage = projectImages[0];
      setFormData({
        title: firstImage.title,
        description: firstImage.description || "",
        category: firstImage.category || "unbuilt",
        project_id: firstImage.project_id || "",
        images: [],
      });
      setCurrentImageId(firstImage.id);
      setIsEditing(true);
      setSelectedProject(title);
      setProjectImages(projectImages);
      setEditingMode("project");
      setEditingImageIndex(null);
      setActiveSection("edit");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handle edit button click for individual image
  const handleEdit = (image) => {
    setFormData({
      title: image.title,
      description: image.description || "",
      category: image.category || "unbuilt",
      project_id: image.project_id || "",
      images: [],
    });
    setCurrentImageId(image.id);
    setIsEditing(true);
    setSelectedProject(null);
    setProjectImages([]);
    setEditingMode("individual");
    setEditingImageIndex(null);
    setPreviewUrls([
      imageService.getImageDataUrl(
        image.id,
        image.category === "secret" ? image.access_token : null
      ),
    ]);
    setActiveSection("edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle edit individual image within a project
  const handleEditProjectImage = (image, index) => {
    setFormData({
      title: image.title,
      description: image.description || "",
      category: image.category || "unbuilt",
      project_id: image.project_id || "",
      images: [],
    });
    setCurrentImageId(image.id);
    setIsEditing(true);
    setEditingMode("individual");
    setEditingImageIndex(index);
    setPreviewUrls([
      imageService.getImageDataUrl(
        image.id,
        image.category === "secret" ? image.access_token : null
      ),
    ]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle delete button click for a project (by title)
  const handleDeleteProject = async (title) => {
    const projectImages = groupedImages[title];
    if (projectImages && projectImages.length > 0) {
      setModalConfig({
        type: "delete",
        title: "Delete Project",
        message: `Are you sure you want to delete all ${projectImages.length} images in the "${title}" project?`,
        confirmText: "Delete Project",
        confirmAction: async () => {
          try {
            for (const image of projectImages) {
              await imageService.deleteImage(image.id);
            }
            setSuccessMessage(`Project "${title}" deleted successfully!`);
            fetchImages();
            setModalConfig(null);
          } catch (err) {
            setError("Error deleting project: " + err.message);
            console.error("Error deleting project:", err);
            setModalConfig(null);
          }
        },
        cancelAction: () => setModalConfig(null),
      });
    }
  };

  // Handle delete button click for individual image
  const handleDelete = async (id) => {
    setModalConfig({
      type: "delete",
      title: "Delete Image",
      message: "Are you sure you want to delete this image?",
      confirmText: "Delete Image",
      confirmAction: async () => {
        try {
          await imageService.deleteImage(id);
          setSuccessMessage("Image deleted successfully!");
          fetchImages();
          setModalConfig(null);
        } catch (err) {
          setError("Error deleting image: " + err.message);
          console.error("Error deleting image:", err);
          setModalConfig(null);
        }
      },
      cancelAction: () => setModalConfig(null),
    });
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "unbuilt",
      project_id: "",
      images: [],
    });
    setPreviewUrls([]);
    setIsEditing(false);
    setCurrentImageId(null);
    setSelectedProject(null);
    setProjectImages([]);
    setEditingMode("project");
    setEditingImageIndex(null);
    setShareLink("");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // Handle image selection for bulk operations
  const handleImageSelection = (id) => {
    setSelectedImages((prev) => {
      if (prev.includes(id)) {
        return prev.filter((imageId) => imageId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    if (selectedImages.length === 0) {
      setError("Please select at least one image to delete");
      return;
    }

    setModalConfig({
      type: "delete",
      title: "Delete Selected Images",
      message: `Are you sure you want to delete ${selectedImages.length} selected images?`,
      confirmText: "Delete Images",
      confirmAction: async () => {
        try {
          for (const id of selectedImages) {
            await imageService.deleteImage(id);
          }

          setSuccessMessage(
            `${selectedImages.length} images deleted successfully!`
          );
          setSelectedImages([]);
          fetchImages();
          setModalConfig(null);
        } catch (err) {
          setError("Error deleting images: " + err.message);
          console.error("Error deleting images:", err);
          setModalConfig(null);
        }
      },
      cancelAction: () => setModalConfig(null),
    });
  };

  // Handle sharing a secret project
  const handleShareProject = (image) => {
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/view-project/${image.id}?access_token=${image.access_token}`;
    setShareLink(shareableLink);
    setActiveSection("access");

    setTimeout(() => {
      if (shareLinkRef.current) {
        shareLinkRef.current.focus();
        shareLinkRef.current.select();
      }
    }, 100);
  };

  // Handle regenerating an access token
  const handleRegenerateToken = async (id) => {
    setModalConfig({
      type: "warning",
      title: "Regenerate Access Token",
      message: "Are you sure you want to regenerate the access token? This will invalidate any existing shared links.",
      confirmText: "Regenerate Token",
      confirmAction: async () => {
        try {
          const result = await imageService.regenerateAccessToken(id);
          setSuccessMessage("Access token regenerated successfully!");
          fetchImages();

          if (shareLink.includes(`/view-project/${id}?`)) {
            const baseUrl = window.location.origin;
            setShareLink(
              `${baseUrl}/view-project/${id}?access_token=${result.access_token}`
            );
          }
          setModalConfig(null);
        } catch (err) {
          setError("Error regenerating access token: " + err.message);
          console.error("Error regenerating access token:", err);
          setModalConfig(null);
        }
      },
      cancelAction: () => setModalConfig(null),
    });
  };

  // Handle revoking access
  const handleRevokeAccess = async (id) => {
    setModalConfig({
      type: "warning",
      title: "Revoke Access",
      message: "Are you sure you want to revoke access? Clients will no longer be able to view this project.",
      confirmText: "Revoke Access",
      confirmAction: async () => {
        try {
          await imageService.revokeAccess(id);
          setSuccessMessage("Access revoked successfully!");
          fetchImages();

          if (shareLink.includes(`/view-project/${id}?`)) {
            setShareLink("");
          }
          setModalConfig(null);
        } catch (err) {
          setError("Error revoking access: " + err.message);
          console.error("Error revoking access:", err);
          setModalConfig(null);
        }
      },
      cancelAction: () => setModalConfig(null),
    });
  };

  // Sidebar navigation items
  const sidebarItems = [
    {
      id: "upload",
      label: "Upload Images",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      id: "gallery",
      label: "Image Gallery",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "edit",
      label: "Edit Images",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
    },
    {
      id: "access",
      label: "Access Control",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  // Render content based on active section
  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Upload New Images
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="built">Built</option>
                      <option value="unbuilt">Unbuilt</option>
                      <option value="secret">Secret</option>
                      <option value="unlisted">Unlisted</option>
                      <option value="Hidden">Hidden</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="project_id" className="block text-sm font-medium text-gray-700">
                    Project
                  </label>
                  <div className="mt-1">
                    <select
                      id="project_id"
                      name="project_id"
                      value={formData.project_id}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    >
                      <option value="">None (General Image)</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>
                          {project.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Maximum 5 images per project
                  </p>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows="3"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    Images *
                  </label>
                  <div className="mt-1">
                    <input
                      type="file"
                      id="images"
                      name="images"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="sr-only"
                      multiple
                      required
                    />
                    
                    {/* Drag and Drop Area */}
                    <div
                      className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors cursor-pointer"
                      onClick={() => document.getElementById('images').click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add('border-indigo-400', 'bg-indigo-50');
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50');
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove('border-indigo-400', 'bg-indigo-50');
                        const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
                        if (files.length > 0) {
                          const event = { target: { files } };
                          handleFileChange(event);
                        }
                      }}
                    >
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="images"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload multiple images</span>
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB each
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-blue-600 font-medium">
                        💡 You can select multiple images at once by holding Ctrl (Windows) or Cmd (Mac) while clicking
                      </p>
                      {formData.project_id && (
                        <p className="text-xs text-orange-600 font-medium">
                          ⚠️ Maximum 5 images per project
                        </p>
                      )}
                    </div>

                    {previewUrls.length > 0 && (
                      <div className="mt-4">
                        <div className="mb-3 flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-700">
                            Selected Images ({previewUrls.length})
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                images: [],
                              });
                              setPreviewUrls([]);
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-medium"
                          >
                            Clear All
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                          {previewUrls.map((url, index) => (
                            <div
                              key={index}
                              className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 group"
                            >
                              <img
                                src={url}
                                alt={`Preview ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                              <div className="absolute top-1 left-1 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                                {index + 1}
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const newImages = [...formData.images];
                                  newImages.splice(index, 1);
                                  const newPreviewUrls = [...previewUrls];
                                  newPreviewUrls.splice(index, 1);

                                  setFormData({
                                    ...formData,
                                    images: newImages,
                                  });
                                  setPreviewUrls(newPreviewUrls);
                                }}
                                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <svg
                                  className="h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-700">
                            <strong>Ready to upload:</strong> {previewUrls.length} image{previewUrls.length !== 1 ? 's' : ''} selected
                            {formData.project_id && previewUrls.length > 5 && (
                              <span className="text-red-600 font-medium"> (Warning: Exceeds 5 image limit for this project)</span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={loading || (formData.images && formData.images.length === 0)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : formData.images && formData.images.length > 0 
                    ? `Upload ${formData.images.length} Image${formData.images.length !== 1 ? 's' : ''}`
                    : "Upload Images"
                  }
                </button>
              </div>
            </form>
          </div>
        );

      case "gallery":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-900">Image Gallery</h2>

              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grouped")}
                    className={`px-3 py-1 text-xs font-medium rounded-md ${
                      viewMode === "grouped"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Group by Title
                  </button>
                  <button
                    onClick={() => setViewMode("individual")}
                    className={`px-3 py-1 text-xs font-medium rounded-md ${
                      viewMode === "individual"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Individual Images
                  </button>
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                >
                  <option value="">All Categories</option>
                  <option value="built">Built</option>
                  <option value="unbuilt">Unbuilt</option>
                  <option value="secret">Secret</option>
                  <option value="unlisted">Unlisted</option>
                  <option value="Hidden">Hidden</option>
                </select>

                {selectedImages.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  >
                    Delete Selected ({selectedImages.length})
                  </button>
                )}
              </div>
            </div>

            {loading ? (
              <p className="text-center py-4">Loading images...</p>
            ) : images.length === 0 ? (
              <p className="text-center py-4 text-gray-500">
                No images found. Upload some images to get started.
              </p>
            ) : viewMode === "grouped" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsByTitle.map(([title, groupImages]) => (
                  <div
                    key={title}
                    className="border rounded-lg overflow-hidden bg-gray-50"
                  >
                    <div className="relative">
                      <div className="absolute top-2 right-2 z-10">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            groupImages[0].category === "built"
                              ? "bg-green-100 text-green-800"
                              : groupImages[0].category === "secret"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {groupImages[0].category}
                        </span>
                      </div>

                      <div className="aspect-w-4 aspect-h-3 w-full">
                        <img
                          src={imageService.getImageDataUrl(
                            groupImages[0].id,
                            groupImages[0].category === "secret"
                              ? groupImages[0].access_token
                              : null
                          )}
                          className="w-full h-48 object-cover"
                        />
                      </div>

                      {groupImages.length > 1 && (
                        <div className="absolute top-2 left-2 bg-white bg-opacity-75 rounded-full w-8 h-8 flex items-center justify-center">
                          <span className="text-xs font-medium">
                            +{groupImages.length - 1}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {title}
                      </h3>
                      {groupImages[0].project_id && (
                        <p className="text-sm text-indigo-600 mt-1">
                          Project:{" "}
                          {projects.find(
                            (p) => p.id === groupImages[0].project_id
                          )?.name || `#${groupImages[0].project_id}`}
                        </p>
                      )}
                      {groupImages[0].description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {groupImages[0].description}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {groupImages.length}{" "}
                        {groupImages.length === 1 ? "image" : "images"}
                      </p>
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => handleEditProject(title)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Edit Project
                        </button>
                        <button
                          onClick={() => handleDeleteProject(title)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Delete Project
                        </button>
                      </div>


                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="border rounded-lg overflow-hidden bg-gray-50"
                  >
                    <div className="relative">
                      <div className="absolute top-2 left-2 z-10">
                        <input
                          type="checkbox"
                          id={`select-${image.id}`}
                          checked={selectedImages.includes(image.id)}
                          onChange={() => handleImageSelection(image.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                      </div>

                      <div className="absolute top-2 right-2 z-10">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            image.category === "built"
                              ? "bg-green-100 text-green-800"
                              : image.category === "secret"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {image.category}
                        </span>
                      </div>

                      <div className="aspect-w-4 aspect-h-3 w-full">
                        <img
                          src={imageService.getImageDataUrl(
                            image.id,
                            image.category === "secret"
                              ? image.access_token
                              : null
                          )}
                          alt={image.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {image.title}
                      </h3>
                      {image.project_id && (
                        <p className="text-sm text-indigo-600 mt-1">
                          Project:{" "}
                          {projects.find((p) => p.id === image.project_id)
                            ?.name || `#${image.project_id}`}
                        </p>
                      )}
                      {image.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                          {image.description}
                        </p>
                      )}
                      <div className="mt-4 flex justify-between">
                        <button
                          onClick={() => handleEdit(image)}
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(image.id)}
                          className="text-red-600 hover:text-red-900 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>


                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "edit":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-gray-900">
                {isEditing
                  ? editingMode === "project"
                    ? `Edit Project: ${selectedProject}`
                    : editingImageIndex !== null
                    ? `Edit Image ${editingImageIndex + 1} in Project: ${selectedProject}`
                    : "Edit Image"
                  : "No Image Selected for Editing"}
              </h2>
              {isEditing && editingMode === "project" && (
                <button
                  onClick={() => setEditingMode("individual")}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Individual Images
                </button>
              )}
            </div>

            {isEditing ? (
              editingMode === "project" ? (
                // Project-level editing
                <div>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                          Project Title *
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="title"
                            id="edit-title"
                            required
                            value={formData.title}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
                          Category *
                        </label>
                        <div className="mt-1">
                          <select
                            id="edit-category"
                            name="category"
                            required
                            value={formData.category}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="built">Built</option>
                            <option value="unbuilt">Unbuilt</option>
                            <option value="secret">Secret</option>
                            <option value="unlisted">Unlisted</option>
                            <option value="Hidden">Hidden</option>
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="edit-project_id" className="block text-sm font-medium text-gray-700">
                          Project
                        </label>
                        <div className="mt-1">
                          <select
                            id="edit-project_id"
                            name="project_id"
                            value={formData.project_id}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          >
                            <option value="">None (General Image)</option>
                            {projects.map((project) => (
                              <option key={project.id} value={project.id}>
                                {project.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                          Project Description
                        </label>
                        <div className="mt-1">
                          <textarea
                            id="edit-description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end space-x-3">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                      >
                        {loading ? "Processing..." : "Update Project"}
                      </button>
                    </div>
                  </form>

                  {/* Project Images Overview */}
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Project Images ({projectImages.length})</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {projectImages.map((image, index) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
                            <img
                              src={imageService.getImageDataUrl(
                                image.id,
                                image.category === "secret" ? image.access_token : null
                              )}
                              alt={`Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                            {index + 1}
                          </div>
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                            <button
                              onClick={() => handleEditProjectImage(image, index)}
                              className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 px-3 py-1.5 rounded-md text-sm font-medium transition-opacity duration-200"
                            >
                              Edit Image
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Individual image editing
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="edit-title" className="block text-sm font-medium text-gray-700">
                        Image Title *
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="title"
                          id="edit-title"
                          required
                          value={formData.title}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
                        Category *
                      </label>
                      <div className="mt-1">
                        <select
                          id="edit-category"
                          name="category"
                          required
                          value={formData.category}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="built">Built</option>
                          <option value="unbuilt">Unbuilt</option>
                          <option value="secret">Secret</option>
                          <option value="unlisted">Unlisted</option>
                          <option value="Hidden">Hidden</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="edit-project_id" className="block text-sm font-medium text-gray-700">
                        Project
                      </label>
                      <div className="mt-1">
                        <select
                          id="edit-project_id"
                          name="project_id"
                          value={formData.project_id}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">None (General Image)</option>
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="edit-description" className="block text-sm font-medium text-gray-700">
                        Image Description
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="edit-description"
                          name="description"
                          rows="3"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-6">
                      <label htmlFor="edit-images" className="block text-sm font-medium text-gray-700">
                        Change Image
                      </label>
                      <div className="mt-1">
                        <input
                          type="file"
                          id="edit-images"
                          name="images"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="sr-only"
                          multiple={false}
                        />
                        <label
                          htmlFor="edit-images"
                          className="relative cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <svg
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Replace Image</span>
                        </label>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>

                        {previewUrls.length > 0 && (
                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {previewUrls.map((url, index) => (
                                <div
                                  key={index}
                                  className="relative h-20 w-20 overflow-hidden rounded-md group"
                                >
                                  <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (editingMode === "individual" && selectedProject) {
                          setEditingMode("project");
                          setEditingImageIndex(null);
                        } else {
                          resetForm();
                        }
                      }}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                    >
                      {editingMode === "individual" && selectedProject ? "Back to Project" : "Cancel"}
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
                    >
                      {loading ? "Processing..." : "Update Image"}
                    </button>
                  </div>
                </form>
              )
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Select an image from the gallery to edit, or use the "Edit" button on any image.
                </p>
              </div>
            )}
          </div>
        );

      case "access":
        return (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-medium text-gray-900 mb-4">
              Access Control & Sharing
            </h2>
            
            {shareLink ? (
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Shareable Link:
                </h3>
                <div className="flex">
                  <input
                    ref={shareLinkRef}
                    type="text"
                    value={shareLink}
                    readOnly
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink);
                      setSuccessMessage("Link copied to clipboard!");
                    }}
                    className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                  >
                    Copy
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Share this link with your client. They will be able to view the
                  project without needing to log in.
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No active share link. Use the "Share Link" button on any secret project to generate a shareable link.
                </p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Secret Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images
                  .filter((img) => img.category === "secret")
                  .map((image) => (
                    <div key={image.id} className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                      {/* Card Header with Image */}
                      <div className="relative h-48 bg-gradient-to-br from-indigo-50 to-purple-50">
                        <img
                          src={imageService.getImageDataUrl(
                            image.id,
                            image.access_token
                          )}
                          alt={image.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Overlay with project info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h4 className="text-lg font-bold text-white mb-1 truncate">
                              {image.title}
                            </h4>
                            <p className="text-sm text-gray-200">
                              Project #{image.project_id || "N/A"}
                            </p>
                          </div>
                        </div>
                        {/* Secret Badge */}
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Secret
                          </span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        {/* Project Details */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Status</span>
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                              Active
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Access Type</span>
                            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                              Token-based
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <button
                            onClick={() => handleShareProject(image)}
                            className="w-full flex items-center justify-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                            </svg>
                            Share Link
                          </button>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleRegenerateToken(image.id)}
                              className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              New Token
                            </button>
                            <button
                              onClick={() => handleRevokeAccess(image.id)}
                              className="flex items-center justify-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
                              </svg>
                              Revoke
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  ))}
              </div>
              
              {/* Empty State */}
              {images.filter((img) => img.category === "secret").length === 0 && (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Secret Projects</h3>
                  <p className="text-gray-500">Create secret projects to enable secure sharing with clients.</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Custom Modal Component
  const CustomModal = ({ config, onClose }) => {
    if (!config) return null;

    const getModalStyles = () => {
      switch (config.type) {
        case "delete":
          return {
            icon: (
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            ),
            confirmButtonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
          };
        case "warning":
          return {
            icon: (
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            ),
            confirmButtonClass: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
          };
        default:
          return {
            icon: (
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            ),
            confirmButtonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
          };
      }
    };

    const styles = getModalStyles();

    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background overlay */}
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

          {/* Modal panel */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                {styles.icon}
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {config.title}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {config.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={config.confirmAction}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${styles.confirmButtonClass} focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {config.confirmText}
              </button>
              <button
                type="button"
                onClick={config.cancelAction}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      {/* Custom Modal */}
      <CustomModal config={modalConfig} onClose={() => setModalConfig(null)} />
      
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg min-h-screen">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">
              Admin Dashboard
            </h1>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Success message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              {successMessage}
            </div>
          )}

          {/* Error message */}
          {(error || imagesError) && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error || imagesError}
            </div>
          )}

          {/* Render content based on active section */}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
