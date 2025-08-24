import React from "react";

const EditSection = ({
  isEditing,
  editingMode,
  setEditingMode,
  selectedProject,
  editingImageIndex,
  formData,
  handleInputChange,
  handleFileChange,
  previewUrls,
  loading,
  onSubmit,
  onCancel,
  projects,
  projectImages,
  handleEditProjectImage,
  imageService,
}) => {
  if (!isEditing) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-medium text-gray-900 mb-6">
          No Image Selected for Editing
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500">
            Select an image from the gallery to edit, or use the "Edit" button
            on any image.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-gray-900">
          {editingMode === "project"
            ? `Edit Project: ${selectedProject}`
            : editingImageIndex !== null
            ? `Edit Image ${
                editingImageIndex + 1
              } in Project: ${selectedProject}`
            : "Edit Image"}
        </h2>
        {editingMode === "project" && (
          <button
            onClick={() => setEditingMode("individual")}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit Individual Images
          </button>
        )}
      </div>

      {editingMode === "project" ? (
        // Project-level editing
        <div>
          <form onSubmit={onSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="edit-title"
                  className="block text-sm font-medium text-gray-700"
                >
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
                  htmlFor="edit-project_id"
                  className="block text-sm font-medium text-gray-700"
                >
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
                <label
                  htmlFor="edit-description"
                  className="block text-sm font-medium text-gray-700"
                >
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
                onClick={onCancel}
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
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Project Images ({projectImages.length})
            </h3>
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
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="edit-title"
                className="block text-sm font-medium text-gray-700"
              >
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
                  <option value="unlisted">Unlisted</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="edit-project_id"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="edit-description"
                className="block text-sm font-medium text-gray-700"
              >
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
              <label
                htmlFor="edit-images"
                className="block text-sm font-medium text-gray-700"
              >
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
              onClick={onCancel}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
            >
              {editingMode === "individual" && selectedProject
                ? "Back to Project"
                : "Cancel"}
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
      )}
    </div>
  );
};

export default EditSection;
