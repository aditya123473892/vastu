import React, { useState } from "react";

const UploadSection = ({
  formData,
  setFormData,
  previewUrls,
  setPreviewUrls,
  loading,
  error,
  setError,
  onSubmit,
  projects,
}) => {
  const [dragActive, setDragActive] = useState(false);

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
      const oversizedFiles = files.filter((file) => file.size > maxSize);

      if (oversizedFiles.length > 0) {
        setError(
          `Some files exceed 5MB limit: ${oversizedFiles
            .map((f) => f.name)
            .join(", ")}`
        );
        return;
      }

      // Check project image limit
      if (formData.project_id && files.length > 5) {
        setError(
          `You can only upload up to 5 images per project. You selected ${files.length} images.`
        );
        return;
      }

      // Check if adding these files would exceed the project limit
      const currentImageCount = formData.images.length;
      if (formData.project_id && currentImageCount + files.length > 5) {
        setError(
          `Adding ${files.length} images would exceed the 5 image limit for this project. You currently have ${currentImageCount} images selected.`
        );
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

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (files.length > 0) {
      const event = { target: { files } };
      handleFileChange(event);
    }
  };

  // Remove single image from selection
  const removeImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);

    setFormData({
      ...formData,
      images: newImages,
    });
    setPreviewUrls(newPreviewUrls);
  };

  // Clear all images
  const clearAllImages = () => {
    setFormData({
      ...formData,
      images: [],
    });
    setPreviewUrls([]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">
        Upload New Images
      </h2>
      <form onSubmit={onSubmit}>
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
              htmlFor="edit-category"
              className="block text-sm font-medium text-gray-700"
            >
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
              <input
                type="number"
                id="project_id"
                name="project_id"
                value={formData.project_id}
                onChange={handleInputChange}
                placeholder="Enter project id (or leave empty)"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              />
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
                className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                  dragActive
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-300 hover:border-indigo-400"
                }`}
                onClick={() => document.getElementById("images").click()}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
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
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      Upload multiple images
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB each
                  </p>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-xs text-blue-600 font-medium">
                  💡 You can select multiple images at once by holding Ctrl
                  (Windows) or Cmd (Mac) while clicking
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
                      onClick={clearAllImages}
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
                          onClick={() => removeImage(index)}
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
                      <strong>Ready to upload:</strong> {previewUrls.length}{" "}
                      image
                      {previewUrls.length !== 1 ? "s" : ""} selected
                      {formData.project_id && previewUrls.length > 5 && (
                        <span className="text-red-600 font-medium">
                          {" "}
                          (Warning: Exceeds 5 image limit for this project)
                        </span>
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
            disabled={
              loading || (formData.images && formData.images.length === 0)
            }
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : formData.images && formData.images.length > 0
              ? `Upload ${formData.images.length} Image${
                  formData.images.length !== 1 ? "s" : ""
                }`
              : "Upload Images"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSection;
