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
    category: "unbuilt", // Default to 'unbuilt'
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
  const [viewMode, setViewMode] = useState("grouped"); // 'grouped' or 'individual'
  const [selectedProject, setSelectedProject] = useState(null);
  const [shareLink, setShareLink] = useState("");
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
      // Limit to 5 images per project
      if (formData.project_id && files.length > 5) {
        setError("You can only upload up to 5 images per project");
        return;
      }

      setFormData({
        ...formData,
        images: files,
      });

      // Create preview URLs for all selected images
      const newPreviewUrls = [];

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviewUrls.push(reader.result);
          if (newPreviewUrls.length === files.length) {
            setPreviewUrls(newPreviewUrls);
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
        // Update existing image (without changing the file)
        await imageService.updateImage(currentImageId, {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          project_id: formData.project_id || null,
        });

        setSuccessMessage("Image updated successfully!");
      } else {
        // Upload new images
        if (!formData.images || formData.images.length === 0) {
          throw new Error("Please select at least one image to upload");
        }

        // Append all selected images
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });

        const result = await imageService.createImage(formDataToSend);
        setSuccessMessage(
          `${result.images.length} image(s) uploaded successfully!`
        );
      }

      // Reset form and refresh images
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
      if (
        window.confirm(
          `Are you sure you want to delete all ${projectImages.length} images in the "${title}" project?`
        )
      ) {
        try {
          // Delete all images in the project
          for (const image of projectImages) {
            await imageService.deleteImage(image.id);
          }
          setSuccessMessage(`Project "${title}" deleted successfully!`);
          fetchImages();
        } catch (err) {
          setError("Error deleting project: " + err.message);
          console.error("Error deleting project:", err);
        }
      }
    }
  };

  // Handle delete button click for individual image
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await imageService.deleteImage(id);
        setSuccessMessage("Image deleted successfully!");
        fetchImages();
      } catch (err) {
        setError("Error deleting image: " + err.message);
        console.error("Error deleting image:", err);
      }
    }
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
    setShareLink("");

    // Clear success message after 3 seconds
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

    if (
      window.confirm(
        `Are you sure you want to delete ${selectedImages.length} selected images?`
      )
    ) {
      try {
        // Delete images one by one
        for (const id of selectedImages) {
          await imageService.deleteImage(id);
        }

        setSuccessMessage(
          `${selectedImages.length} images deleted successfully!`
        );
        setSelectedImages([]);
        fetchImages();
      } catch (err) {
        setError("Error deleting images: " + err.message);
        console.error("Error deleting images:", err);
      }
    }
  };

  // Handle sharing a secret project
  const handleShareProject = (image) => {
    // Create a shareable link with the access token
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/view-project/${image.id}?access_token=${image.access_token}`;
    setShareLink(shareableLink);

    // Focus and select the text for easy copying
    setTimeout(() => {
      if (shareLinkRef.current) {
        shareLinkRef.current.focus();
        shareLinkRef.current.select();
      }
    }, 100);
  };

  // Handle regenerating an access token
  const handleRegenerateToken = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to regenerate the access token? This will invalidate any existing shared links."
      )
    ) {
      try {
        const result = await imageService.regenerateAccessToken(id);
        setSuccessMessage("Access token regenerated successfully!");
        fetchImages();

        // Update the share link if it's currently being displayed
        if (shareLink.includes(`/view-project/${id}?`)) {
          const baseUrl = window.location.origin;
          setShareLink(
            `${baseUrl}/view-project/${id}?access_token=${result.access_token}`
          );
        }
      } catch (err) {
        setError("Error regenerating access token: " + err.message);
        console.error("Error regenerating access token:", err);
      }
    }
  };

  // Handle revoking access
  const handleRevokeAccess = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to revoke access? Clients will no longer be able to view this project."
      )
    ) {
      try {
        await imageService.revokeAccess(id);
        setSuccessMessage("Access revoked successfully!");
        fetchImages();

        // Clear the share link if it's for this project
        if (shareLink.includes(`/view-project/${id}?`)) {
          setShareLink("");
        }
      } catch (err) {
        setError("Error revoking access: " + err.message);
        console.error("Error revoking access:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Upload and manage images for your website
          </p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Error message - show either component error or images error */}
        {(error || imagesError) && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
            {error || imagesError}
          </div>
        )}

        {/* Upload/Edit Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-4">
            {isEditing
              ? selectedProject
                ? `Edit Project: ${selectedProject}`
                : "Edit Image"
              : "Upload New Images"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="project_id"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="images"
                  className="block text-sm font-medium text-gray-700"
                >
                  {isEditing ? "Image" : "Images"} {!isEditing && "*"}
                </label>
                <div className="mt-1">
                  <input
                    type="file"
                    id="images"
                    name="images"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    multiple={!isEditing}
                    required={!isEditing}
                  />
                  <label
                    htmlFor="images"
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
                    <span>{isEditing ? "Change Image" : "Select Images"}</span>
                  </label>
                  <p className="mt-1 text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>

                  {/* Preview for multiple images */}
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
                            {!isEditing && (
                              <button
                                type="button"
                                onClick={() => {
                                  // Remove this image from preview and form data
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
                                  className="h-6 w-6 text-white"
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
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end space-x-3">
              {isEditing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : isEditing
                  ? "Update Image"
                  : "Upload Image"}
              </button>
            </div>
          </form>
        </div>

        {/* Share Link Section */}
        {shareLink && (
          <div className="mt-4 p-4 bg-gray-50 rounded-md mb-8">
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
        )}

        {/* Image Gallery */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium text-gray-900">Image Gallery</h2>

            <div className="flex space-x-4">
              {/* View mode toggle */}
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

              {/* Category filter */}
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

              {/* Bulk actions */}
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
            // Grouped by title view
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsByTitle.map(([title, groupImages]) => (
                <div
                  key={title}
                  className="border rounded-lg overflow-hidden bg-gray-50"
                >
                  <div className="relative">
                    {/* Category badge */}
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

                    {/* Secret project controls */}
                    {groupImages[0].category === "secret" && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleShareProject(groupImages[0])}
                          className="text-indigo-600 hover:text-indigo-900 text-xs font-medium"
                        >
                          Share Link
                        </button>
                        <button
                          onClick={() =>
                            handleRegenerateToken(groupImages[0].id)
                          }
                          className="text-orange-600 hover:text-orange-900 text-xs font-medium"
                        >
                          New Token
                        </button>
                        <button
                          onClick={() => handleRevokeAccess(groupImages[0].id)}
                          className="text-red-600 hover:text-red-900 text-xs font-medium"
                        >
                          Revoke Access
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Individual images view (original view)
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="border rounded-lg overflow-hidden bg-gray-50"
                >
                  <div className="relative">
                    {/* Checkbox for selection */}
                    <div className="absolute top-2 left-2 z-10">
                      <input
                        type="checkbox"
                        id={`select-${image.id}`}
                        checked={selectedImages.includes(image.id)}
                        onChange={() => handleImageSelection(image.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                    </div>

                    {/* Category badge */}
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

                    {/* Secret project controls */}
                    {image.category === "secret" && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => handleShareProject(image)}
                          className="text-indigo-600 hover:text-indigo-900 text-xs font-medium"
                        >
                          Share Link
                        </button>
                        <button
                          onClick={() => handleRegenerateToken(image.id)}
                          className="text-orange-600 hover:text-orange-900 text-xs font-medium"
                        >
                          New Token
                        </button>
                        <button
                          onClick={() => handleRevokeAccess(image.id)}
                          className="text-red-600 hover:text-red-900 text-xs font-medium"
                        >
                          Revoke Access
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
