import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { imageService } from "../services/api";

const ViewProject = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get("access_token");
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageAndRelated = async () => {
      if (!id || !accessToken) {
        setError("Invalid link or access token");
        setLoading(false);
        return;
      }

      try {
        // Fetch the main image details
        const response = await fetch(
          `http://localhost:4000/api/images/${id}?access_token=${accessToken}`
        );

        if (!response.ok) {
          if (response.status === 403) {
            setError(
              "Access denied. This link may have been revoked or is invalid."
            );
          } else if (response.status === 404) {
            setError("Project not found.");
          } else {
            setError("Error loading project.");
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setImage(data);

        // If the image has a project_id, fetch all related images
        if (data.project_id) {
          const relatedResponse = await fetch(
            `http://localhost:4000/api/images?project_id=${data.project_id}&access_token=${accessToken}`
          );
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            setRelatedImages(relatedData);
          }
        }
      } catch (err) {
        console.error("Error fetching image:", err);
        setError("Error loading project. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchImageAndRelated();
  }, [id, accessToken]);

  // Function to determine file type based on filename or mime type
  const getFileType = (filename, mimeType) => {
    if (!filename) return "unknown";

    const extension = filename.toLowerCase().split(".").pop();

    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
      return "image";
    } else if (extension === "pdf") {
      return "pdf";
    } else if (["csv"].includes(extension)) {
      return "csv";
    } else if (["xls", "xlsx"].includes(extension)) {
      return "excel";
    }

    return "unknown";
  };

  // Function to get file icon
  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "📄";
      case "csv":
        return "📊";
      case "excel":
        return "📈";
      default:
        return "📎";
    }
  };

  // Function to get file display name
  const getFileTypeName = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "PDF Document";
      case "csv":
        return "CSV File";
      case "excel":
        return "Excel Spreadsheet";
      case "image":
        return "Image";
      default:
        return "File";
    }
  };

  // Component to render different file types
  const FileViewer = ({ file, accessToken, isMain = false }) => {
    const fileType = getFileType(file.filename || file.title, file.mime_type);
    const fileUrl = `http://localhost:4000/api/images/${file.id}/data?access_token=${accessToken}`;

    const containerClasses = isMain
      ? "border-t border-gray-200 p-6"
      : "w-full h-48 flex items-center justify-center bg-gray-50";

    switch (fileType) {
      case "image":
        return (
          <div className={isMain ? "border-t border-gray-200" : ""}>
            <img
              src={fileUrl}
              alt={file.title}
              className={
                isMain
                  ? "w-full h-auto object-contain max-h-[80vh]"
                  : "w-full h-48 object-cover"
              }
            />
          </div>
        );

      case "pdf":
        return (
          <div className={containerClasses}>
            {isMain ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  PDF Document
                </h3>
                <div className="space-y-3">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View PDF
                  </a>
                  <a
                    href={fileUrl}
                    download={file.filename || file.title}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </a>
                </div>
                <iframe
                  src={fileUrl}
                  className="w-full h-[500px] border border-gray-300 rounded mt-4"
                  title={file.title}
                />
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">📄</div>
                <div className="text-sm font-medium text-gray-700">PDF</div>
              </div>
            )}
          </div>
        );

      case "csv":
        return (
          <div className={containerClasses}>
            {isMain ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  CSV File
                </h3>
                <div className="space-y-3">
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    View CSV
                  </a>
                  <a
                    href={fileUrl}
                    download={file.filename || file.title}
                    className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  CSV files are best viewed in spreadsheet applications like
                  Excel, Google Sheets, or Numbers.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-sm font-medium text-gray-700">CSV</div>
              </div>
            )}
          </div>
        );

      case "excel":
        return (
          <div className={containerClasses}>
            {isMain ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📈</div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Excel Spreadsheet
                </h3>
                <div className="space-y-3">
                  <a
                    href={fileUrl}
                    download={file.filename || file.title}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Download Excel File
                  </a>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Excel files (.xls, .xlsx) need to be downloaded and opened in
                  Excel, Google Sheets, or similar applications.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">📈</div>
                <div className="text-sm font-medium text-gray-700">Excel</div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <div className={containerClasses}>
            {isMain ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📎</div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">File</h3>
                <a
                  href={fileUrl}
                  download={file.filename || file.title}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download File
                </a>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-4xl mb-2">📎</div>
                <div className="text-sm font-medium text-gray-700">File</div>
              </div>
            )}
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full text-center">
          <svg
            className="mx-auto h-12 w-12 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="mt-3 text-lg font-medium text-red-800">{error}</h3>
          <div className="mt-4">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-4">
          <p className="text-gray-500">No project found</p>
        </div>
      </div>
    );
  }

  const mainFileType = getFileType(
    image.filename || image.title,
    image.mime_type
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {image.title}
                </h1>
                <div className="mt-1 flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getFileTypeName(mainFileType)}
                  </span>
                  {image.filename && (
                    <span className="text-sm text-gray-500">
                      {image.filename}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-4xl">
                {mainFileType === "image" ? "🖼️" : getFileIcon(mainFileType)}
              </div>
            </div>
            {image.description && (
              <p className="mt-3 text-gray-600">{image.description}</p>
            )}
            {image.project_id && (
              <p className="mt-2 text-sm text-gray-500">
                Project ID: {image.project_id}
              </p>
            )}
          </div>

          <FileViewer file={image} accessToken={accessToken} isMain={true} />
        </div>

        {relatedImages.length > 1 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              All Project Files ({relatedImages.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedImages.map((img) => {
                const fileType = getFileType(
                  img.filename || img.title,
                  img.mime_type
                );
                return (
                  <div
                    key={img.id}
                    className="bg-white rounded-lg shadow overflow-hidden"
                  >
                    <FileViewer
                      file={img}
                      accessToken={accessToken}
                      isMain={false}
                    />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-md font-medium text-gray-900 truncate">
                          {img.title}
                        </h3>
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {getFileTypeName(fileType)}
                        </span>
                      </div>
                      {img.description && (
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                          {img.description}
                        </p>
                      )}
                      {img.filename && (
                        <p className="text-xs text-gray-400 truncate">
                          {img.filename}
                        </p>
                      )}
                      <div className="mt-3">
                        <a
                          href={`http://localhost:4000/api/images/${img.id}/data?access_token=${accessToken}`}
                          download={img.filename || img.title}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
                        >
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProject;
