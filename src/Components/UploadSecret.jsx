import React, { useState } from "react";

const UploadSecret = ({
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

  // Allowed file types
  const allowedFileTypes = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "application/pdf": ".pdf",
    "text/csv": ".csv",
    "application/vnd.ms-excel": ".xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      ".xlsx",
  };

  // Check if file is an image
  const isImageFile = (file) => {
    return file.type.startsWith("image/");
  };

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "🖼️";
    } else if (fileType === "application/pdf") {
      return "📄";
    } else if (fileType === "text/csv") {
      return "📊";
    } else if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
      return "📈";
    }
    return "📎";
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      // Clear any previous errors
      setError(null);

      // Check file size limit (10MB per file)
      const maxSize = 10 * 1024 * 1024; // 10MB in bytes
      const oversizedFiles = files.filter((file) => file.size > maxSize);

      if (oversizedFiles.length > 0) {
        setError(
          `Some files exceed 10MB limit: ${oversizedFiles
            .map((f) => f.name)
            .join(", ")}`
        );
        return;
      }

      // Check file types
      const invalidFiles = files.filter((file) => {
        const isValidMimeType = Object.keys(allowedFileTypes).includes(
          file.type
        );
        const hasValidExtension =
          /\.(jpg|jpeg|png|gif|webp|svg|pdf|csv|xls|xlsx)$/i.test(file.name);
        return !isValidMimeType && !hasValidExtension;
      });

      if (invalidFiles.length > 0) {
        setError(
          `Unsupported file types: ${invalidFiles
            .map((f) => f.name)
            .join(", ")}. Allowed: images, PDF, CSV, XLS, XLSX`
        );
        return;
      }

      // Check project file limit
      if (formData.project_id && files.length > 5) {
        setError(
          `You can only upload up to 5 files per project. You selected ${files.length} files.`
        );
        return;
      }

      // Check if adding these files would exceed the project limit
      const currentFileCount = formData.files?.length || 0;
      if (formData.project_id && currentFileCount + files.length > 5) {
        setError(
          `Adding ${files.length} files would exceed the 5 file limit for this project. You currently have ${currentFileCount} files selected.`
        );
        return;
      }

      // If there are already files selected, append new ones instead of replacing
      const existingFiles = formData.files || [];
      const allFiles = [...existingFiles, ...files];

      setFormData({
        ...formData,
        files: allFiles,
      });

      // Generate preview URLs for new files only
      const newPreviewUrls = [];
      files.forEach((file) => {
        if (isImageFile(file)) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newPreviewUrls.push({
              url: reader.result,
              type: "image",
              name: file.name,
              size: file.size,
            });
            if (newPreviewUrls.length === files.filter(isImageFile).length) {
              // Add non-image files as file objects
              const nonImageFiles = files
                .filter((f) => !isImageFile(f))
                .map((file) => ({
                  url: null,
                  type: "file",
                  name: file.name,
                  size: file.size,
                  fileType: file.type,
                }));
              setPreviewUrls([
                ...previewUrls,
                ...newPreviewUrls,
                ...nonImageFiles,
              ]);
            }
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, just add file info
          newPreviewUrls.push({
            url: null,
            type: "file",
            name: file.name,
            size: file.size,
            fileType: file.type,
          });
        }
      });

      // If no image files, update preview URLs immediately
      if (files.every((f) => !isImageFile(f))) {
        setPreviewUrls([...previewUrls, ...newPreviewUrls]);
      }
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

    const files = Array.from(e.dataTransfer.files).filter((file) => {
      const isValidMimeType = Object.keys(allowedFileTypes).includes(file.type);
      const hasValidExtension =
        /\.(jpg|jpeg|png|gif|webp|svg|pdf|csv|xls|xlsx)$/i.test(file.name);
      return isValidMimeType || hasValidExtension;
    });

    if (files.length > 0) {
      const event = { target: { files } };
      handleFileChange(event);
    }
  };

  // Remove single file from selection
  const removeFile = (index) => {
    const newFiles = [...(formData.files || [])];
    newFiles.splice(index, 1);
    const newPreviewUrls = [...previewUrls];
    newPreviewUrls.splice(index, 1);

    setFormData({
      ...formData,
      files: newFiles,
    });
    setPreviewUrls(newPreviewUrls);
  };

  // Clear all files
  const clearAllFiles = () => {
    setFormData({
      ...formData,
      files: [],
    });
    setPreviewUrls([]);
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-medium text-gray-900 mb-4">
        Upload New Files
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
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category *
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="category"
                name="category"
                value="secret"
                readOnly
                className="shadow-sm block w-full sm:text-sm border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
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
              Maximum 5 files per project
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
              htmlFor="files"
              className="block text-sm font-medium text-gray-700"
            >
              Files *
            </label>
            <div className="mt-1">
              <input
                type="file"
                id="files"
                name="files"
                accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.csv,.xls,.xlsx"
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
                onClick={() => document.getElementById("files").click()}
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
                      Upload multiple files
                    </span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    Images, PDF, CSV, XLS, XLSX up to 10MB each
                  </p>
                </div>
              </div>

              <div className="mt-2 space-y-1">
                <p className="text-xs text-blue-600 font-medium">
                  💡 Supported formats: Images (JPG, PNG, GIF, WebP, SVG), PDF,
                  CSV, Excel (XLS, XLSX)
                </p>
                <p className="text-xs text-blue-600 font-medium">
                  💡 You can select multiple files at once by holding Ctrl
                  (Windows) or Cmd (Mac) while clicking
                </p>
                {formData.project_id && (
                  <p className="text-xs text-orange-600 font-medium">
                    ⚠️ Maximum 5 files per project
                  </p>
                )}
              </div>

              {previewUrls.length > 0 && (
                <div className="mt-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">
                      Selected Files ({previewUrls.length})
                    </h4>
                    <button
                      type="button"
                      onClick={clearAllFiles}
                      className="text-xs text-red-600 hover:text-red-800 font-medium"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {previewUrls.map((item, index) => (
                      <div
                        key={index}
                        className="relative border border-gray-200 rounded-lg p-3 group hover:shadow-md transition-shadow"
                      >
                        {item.type === "image" ? (
                          <div className="aspect-square overflow-hidden rounded-lg mb-2">
                            <img
                              src={item.url}
                              alt={`Preview ${index + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="aspect-square flex items-center justify-center bg-gray-100 rounded-lg mb-2">
                            <div className="text-center">
                              <div className="text-3xl mb-2">
                                {getFileIcon(item.fileType)}
                              </div>
                              <div className="text-xs text-gray-500 uppercase font-medium">
                                {item.fileType?.split("/")[1] || "FILE"}
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="text-xs text-gray-700 truncate font-medium mb-1">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatFileSize(item.size)}
                        </div>

                        <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white text-xs px-1.5 py-0.5 rounded">
                          {index + 1}
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <svg
                            className="h-3 w-3"
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
                      file
                      {previewUrls.length !== 1 ? "s" : ""} selected
                      {formData.project_id && previewUrls.length > 5 && (
                        <span className="text-red-600 font-medium">
                          {" "}
                          (Warning: Exceeds 5 file limit for this project)
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
              loading || (formData.files && formData.files.length === 0)
            }
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading
              ? "Processing..."
              : formData.files && formData.files.length > 0
              ? `Upload ${formData.files.length} File${
                  formData.files.length !== 1 ? "s" : ""
                }`
              : "Upload Files"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadSecret;
