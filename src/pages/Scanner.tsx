import { useRef, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";

const ROBOFLOW_API_KEY = "XKEYk9k6TUKPjLCk4yrp"; 
const MODEL_ENDPOINT = "ipis-cockroach-detector-iejse/1"

type Prediction = {
  class: string;
  confidence: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const CONFIDENCE_THRESHOLD = 0.85;

const Scanner = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setError(null);
    setPrediction(null);

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;
      const pureBase64 = base64.split(",")[1];

      processImageWithRoboflow(pureBase64);
    };

    reader.readAsDataURL(file);
  };


const processImageWithRoboflow = async (
  base64Image: string
) => {
  setLoading(true);
  setError(null);
  setPrediction(null);

  try {
    const response = await fetch(
      `https://serverless.roboflow.com/${MODEL_ENDPOINT}?api_key=${ROBOFLOW_API_KEY}`,
      {
        method: "POST",
        body: base64Image,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Roboflow request failed (${response.status})`
      );
    }

    const data = await response.json();

    console.log("Roboflow Response:", data);

    if (
      !data.predictions ||
      data.predictions.length === 0
    ) {
      setError("No cockroach detected.");
      return;
    }

    const bestPrediction = data.predictions.sort(
      (a: Prediction, b: Prediction) =>
        b.confidence - a.confidence
    )[0];

    console.log(
      "Best Prediction:",
      bestPrediction.class,
      bestPrediction.confidence
    );

    if (
      bestPrediction.confidence <
      CONFIDENCE_THRESHOLD
    ) {
      setError(
        `No cockroach detected. Confidence too low (${Math.round(
          bestPrediction.confidence * 100
        )}%).`
      );
      return;
    }

    setPrediction(bestPrediction);
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Unexpected error occurred.");
    }
  } finally {
    setLoading(false);
  }
};
  const clearScanner = () => {
    setImage(null);
    setPrediction(null);
    setError(null);
  };

  const confidenceColor =
    prediction?.confidence && prediction.confidence >= 0.9
      ? "text-green-600"
      : prediction?.confidence &&
        prediction.confidence >= 0.75
      ? "text-amber-600"
      : "text-red-600";

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Cockroach Scanner
        </h1>

        <p className="text-gray-500 mt-2">
          Upload or capture a cockroach image for
          detection.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-6">
        <div className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center text-center">
          {image ? (
            <img
              src={image}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-2xl mb-6 shadow-sm"
            />
          ) : (
            <div className="text-gray-400 py-12">
              <p className="text-lg">
                No image selected
              </p>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <button
              onClick={() =>
                fileInputRef.current?.click()
              }
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl"
            >
              Upload Image
            </button>

            <button
              onClick={() =>
                cameraInputRef.current?.click()
              }
              disabled={loading}
              className="border-2 border-slate-700 px-6 py-3 rounded-xl"
            >
              Open Camera
            </button>

            <button
              onClick={clearScanner}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl"
            >
              Clear
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleImageUpload}
          />

          <input
            type="file"
            accept="image/*"
            capture="environment"
            hidden
            ref={cameraInputRef}
            onChange={handleImageUpload}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-md p-6 min-h-48 relative">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Detection Result
        </h2>

        {loading && (
          <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center gap-2">
            <Loader2
              className="animate-spin"
              size={32}
            />

            <p className="text-sm text-slate-600">
              Analyzing image...
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-50 text-red-700 p-4 rounded-xl">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !prediction && (
          <p className="text-center text-gray-400 py-8">
            Upload an image to begin scanning.
          </p>
        )}

        {!loading && prediction && (
          <div className="space-y-4">
            <div className="flex justify-between border-b pb-2">
              <span>Detected Pest</span>
              <span className="font-bold">
                Cockroach
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Confidence</span>
              <span
                className={`font-bold ${confidenceColor}`}
              >
                {Math.round(
                  prediction.confidence * 100
                )}
                %
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Risk Level</span>

              <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm font-medium">
                High
              </span>
            </div>

            <div>
              <p className="text-gray-500 mb-1">
                Result
              </p>

              <p className="text-sm text-slate-700">
                A cockroach was detected in the
                uploaded image with{" "}
                <strong>
                  {Math.round(
                    prediction.confidence * 100
                  )}
                  %
                </strong>{" "}
                confidence.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scanner;
