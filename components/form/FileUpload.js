"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function FileUpload({
  accept,
  onChange = () => {},
  multiple,
  ...props
}) {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // Create preview URLs for images
    if (files.length > 0) {
      const newPreviews = files.map(file => {
        // Only create preview URLs for image files
        if (file.type.startsWith('image/')) {
          return {
            name: file.name,
            url: URL.createObjectURL(file)
          };
        }
        return {
          name: file.name,
          url: null
        };
      });
      
      setPreviews(newPreviews);
      
      // Clean up URLs when component unmounts
      return () => {
        newPreviews.forEach(preview => {
          if (preview.url) URL.revokeObjectURL(preview.url);
        });
      };
    }
  }, [files]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
      if (onChange) onChange(e);
    }
  };

  const removeFile = (fileName) => {
    // Find the preview to revoke URL
    const previewToRemove = previews.find(preview => preview.name === fileName);
    if (previewToRemove && previewToRemove.url) {
      URL.revokeObjectURL(previewToRemove.url);
    }
    
    setFiles(files.filter((file) => file.name !== fileName));
    setPreviews(previews.filter((preview) => preview.name !== fileName));
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          {...props}
        />
        <label
          htmlFor="file-upload"
          className="hover:bg-gray-100 flex items-center justify-between cursor-pointer field-base px-2 min-h-[114px] 2xl:min-h-[120px]"
        >
          {files.length > 0 ? (
            <div className={`${files.length == 1 ? "justify-center" : ""} flex flex-wrap gap-2 w-full`}>
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className="relative group"
                >
                  {preview.url ? (
                    <div className="w-24 h-24 relative overflow-hidden rounded-md">
                      <Image 
                        src={preview.url} 
                        alt={preview.name}
                        fill
                        sizes="96px"
                        style={{ objectFit: "cover" }}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                        <button
                          type="button"
                          className="opacity-0 group-hover:opacity-100 p-1 bg-white rounded-full text-red-600 hover:text-red-800 focus:outline-none transition-opacity duration-200"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile(preview.name);
                          }}
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex items-center px-2 py-0.5 bg-purple-100 rounded-md">
                      <span className="font-14 text-purple-800">{preview.name}</span>
                      <button
                        type="button"
                        className="ml-1 text-purple-700 hover:text-purple-900 focus:outline-none"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFile(preview.name);
                        }}
                      >
                        <svg
                          className="w-3 2xl:w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center w-full">
              <svg
                className="shrink-0 size-4 2xl:size-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              <span className="font-14 text-gray-400">Upload file</span>
            </div>
          )}
        </label>
      </div>
    </div>
  );
}