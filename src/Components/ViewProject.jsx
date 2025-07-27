import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { imageService } from '../services/api';

const ViewProject = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const navigate = useNavigate();
  
  const [image, setImage] = useState(null);
  const [relatedImages, setRelatedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageAndRelated = async () => {
      if (!id || !accessToken) {
        setError('Invalid link or access token');
        setLoading(false);
        return;
      }

      try {
        // Fetch the main image details
        const response = await fetch(`http://localhost:4000/api/images/${id}?access_token=${accessToken}`);
        
        if (!response.ok) {
          if (response.status === 403) {
            setError('Access denied. This link may have been revoked or is invalid.');
          } else if (response.status === 404) {
            setError('Project not found.');
          } else {
            setError('Error loading project.');
          }
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setImage(data);
        
        // If the image has a project_id, fetch all related images
        if (data.project_id) {
          const relatedResponse = await fetch(`http://localhost:4000/api/images?project_id=${data.project_id}&access_token=${accessToken}`);
          if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            setRelatedImages(relatedData);
          }
        }
      } catch (err) {
        console.error('Error fetching image:', err);
        setError('Error loading project. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchImageAndRelated();
  }, [id, accessToken]);

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
          <svg className="mx-auto h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="mt-3 text-lg font-medium text-red-800">{error}</h3>
          <div className="mt-4">
            <button
              onClick={() => navigate('/')}
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

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6">
            <h1 className="text-2xl font-bold text-gray-900">{image.title}</h1>
            {image.description && (
              <p className="mt-2 text-gray-600">{image.description}</p>
            )}
            {image.project_id && (
              <p className="mt-1 text-sm text-gray-500">Project ID: {image.project_id}</p>
            )}
          </div>
          
          <div className="border-t border-gray-200">
            <img 
              src={`http://localhost:4000/api/images/${image.id}/data?access_token=${accessToken}`}
              alt={image.title}
              className="w-full h-auto object-contain max-h-[80vh]"
            />
          </div>
        </div>
        
        {relatedImages.length > 1 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Project Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedImages.map(img => (
                <div key={img.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <img 
                    src={`http://localhost:4000/api/images/${img.id}/data?access_token=${accessToken}`}
                    alt={img.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-md font-medium text-gray-900">{img.title}</h3>
                    {img.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{img.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProject;