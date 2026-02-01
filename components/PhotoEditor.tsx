import React, { useState, useRef } from 'react';
import { editImage } from '../services/geminiService';

interface PhotoEditorProps {
  onBack: () => void;
}

const PhotoEditor: React.FC<PhotoEditorProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage || !prompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Assuming mimeType is jpeg for simplicity, or extract from base64 header
      const response = await editImage(selectedImage, prompt, 'image/jpeg');
      
      if (response.error) {
        setError(response.error);
      } else if (response.imageUrl) {
        setResultImage(response.imageUrl);
      }
    } catch (err) {
      setError("حدث خطأ غير متوقع.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="text-white hover:text-teal-100 flex items-center gap-2">
          <i className="fa-solid fa-arrow-right"></i> الرئيسية
        </button>
        <h2 className="text-2xl font-bold text-white">مختبر الصور الذكي (Gemini AI)</h2>
      </div>

      <div className="glass-panel rounded-2xl p-8">
        <p className="text-gray-600 mb-6 text-center">
          قم برفع صورة لمعلم سياحي واستخدم الذكاء الاصطناعي لتعديلها أو تحسينها.
          <br/>
          <span className="text-xs text-gray-500">مثال: "أضف ألوان غروب الشمس"، "اجعل الصورة تبدو قديمة"</span>
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-teal-300 rounded-xl h-64 flex flex-col items-center justify-center bg-white/40 cursor-pointer hover:bg-white/60 transition-colors overflow-hidden relative"
            >
              {selectedImage ? (
                <img src={selectedImage} alt="Selected" className="w-full h-full object-contain" />
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-up text-4xl text-teal-600 mb-2"></i>
                  <span className="text-gray-500 font-bold">اضغط لرفع صورة</span>
                </>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload} 
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">التعليمات (Prompt)</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="ماذا تريد أن تفعل بالصورة؟"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none text-right"
                rows={3}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!selectedImage || !prompt || isProcessing}
              className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                !selectedImage || !prompt || isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-teal-600 hover:bg-teal-700 hover:scale-[1.02]'
              }`}
            >
              {isProcessing ? (
                <span><i className="fa-solid fa-circle-notch fa-spin ml-2"></i> جاري المعالجة...</span>
              ) : (
                <span><i className="fa-solid fa-wand-magic-sparkles ml-2"></i> تنفيذ التعديل</span>
              )}
            </button>
            
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="border-2 border-teal-100 rounded-xl h-[500px] flex flex-col items-center justify-center bg-white/40 relative">
             <h3 className="absolute top-4 right-4 bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-teal-800 shadow-sm">النتيجة</h3>
             {resultImage ? (
               <img src={resultImage} alt="Result" className="w-full h-full object-contain p-2" />
             ) : (
               <div className="text-center text-gray-400">
                 <i className="fa-solid fa-image text-4xl mb-2"></i>
                 <p>ستظهر الصورة المعدلة هنا</p>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoEditor;
