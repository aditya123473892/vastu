import React from "react";

const GallerySection = ({
  images,
  loading,
  categoryFilter,
  setCategoryFilter,
  viewMode,
  setViewMode,
  selectedImages,
  handleImageSelection,
  handleBulkDelete,
  handleEdit,
  handleDelete,
  handleEditProject,
  handleDeleteProject,
  projects,
  imageService,
}) => {
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
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                {groupImages[0].project_id && (
                  <p className="text-sm text-indigo-600 mt-1">
                    Project:{" "}
                    {projects.find((p) => p.id === groupImages[0].project_id)
                      ?.name || `#${groupImages[0].project_id}`}
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
                      image.category === "secret" ? image.access_token : null
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
                    {projects.find((p) => p.id === image.project_id)?.name ||
                      `#${image.project_id}`}
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
};

export default GallerySection;
