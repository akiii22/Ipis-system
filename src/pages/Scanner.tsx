import { useRef, useState } from "react";

const Scanner = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null); 

  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
<div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Pest Scanner</h1>
        <p className="text-gray-500 mt-2">Upload or capture a pest image</p>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        {/* Changed dashed border from green-300 to slate-300 */}
        <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
          {/* Preview */}
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-2xl mb-6"
            />
          ) : (
            <div className="text-gray-400">
              <p className="text-lg">No image selected</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            {/* Upload Button - Solid Dark Theme */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition font-medium cursor-pointer"
            >
              Upload Image
            </button>

            {/* Camera Button - Clean Outline Variant */}
            <button
              onClick={() => cameraInputRef.current?.click()} // Connected to the camera input
              className="border-2 border-slate-700 hover:bg-slate-50 text-slate-800 px-6 py-3 rounded-xl transition font-medium cursor-pointer"
            >
              Open Camera
            </button>
          </div>

          {/* Hidden Input for File Upload (allows files & photos on mobile) */}
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />

          {/* Hidden Input strictly for Mobile Camera */}
          <input
            type="file"
            ref={cameraInputRef}
            accept="image/*"
            capture="environment" // This forces mobile browsers to open the rear camera directly
            hidden
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Mock AI Result */}
      <div className="bg-white rounded-3xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">AI Result</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-500">Pest Name</span>
            {/* Changed from text-green-600 to text-slate-800 */}
            <span className="font-semibold text-slate-800">Cockroach</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Confidence</span>
            <span className="font-semibold">94%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Risk Level</span>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
              High
            </span>
          </div>
          <div>
            <p className="text-gray-500 mb-2">Treatment</p>
            <p className="text-slate-700">
              Use insecticide and maintain cleanliness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scanner;