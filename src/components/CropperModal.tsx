import React, { useState, useRef, useEffect } from 'react';
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { X, ZoomIn, RotateCw } from 'lucide-react';

interface CropperModalProps {
    imageSrc: string;
    aspectRatio?: number;
    onClose: () => void;
    onCropComplete: (croppedImgFile: File) => void;
}

const TO_RADIANS = Math.PI / 180;

async function getCroppedImg(
    image: HTMLImageElement,
    crop: PixelCrop,
    scale = 1,
    rotate = 0,
): Promise<File | null> {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) return null;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // The crop box width/height mapped to natural pixels
    const width = Math.floor(crop.width * scaleX);
    const height = Math.floor(crop.height * scaleY);

    canvas.width = width;
    canvas.height = height;

    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotateRads = rotate * TO_RADIANS;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();
    
    // Move crop origin to canvas origin
    ctx.translate(-cropX, -cropY);
    // Move origin to center of original image
    ctx.translate(centerX, centerY);
    // Rotate and scale
    ctx.rotate(rotateRads);
    ctx.scale(scale, scale);
    // Move center back
    ctx.translate(-centerX, -centerY);

    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight
    );

    ctx.restore();

    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                resolve(null);
                return;
            }
            resolve(new File([blob], "cropped-image.jpeg", { type: "image/jpeg" }));
        }, 'image/jpeg', 0.95);
    });
}

export default function CropperModal({ imageSrc, aspectRatio, onClose, onCropComplete }: CropperModalProps) {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [crop, setCrop] = useState<Crop>();
    const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
    
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    // Make the layout wrap gracefully on small screens
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
        imgRef.current = e.currentTarget;
        const { width, height } = e.currentTarget;
        
        let initialWidth = width * 0.8;
        let initialHeight = height * 0.8;
        
        if (aspectRatio) {
            // Adjust based on aspect ratio
            if (width / height > aspectRatio) {
                initialWidth = initialHeight * aspectRatio;
            } else {
                initialHeight = initialWidth / aspectRatio;
            }
        }
        
        setCrop({
            unit: 'px',
            width: initialWidth,
            height: initialHeight,
            x: (width - initialWidth) / 2,
            y: (height - initialHeight) / 2
        });
    }

    const handleSaveCrop = async () => {
        if (!completedCrop || !imgRef.current) return;
        setIsSaving(true);
        try {
            const file = await getCroppedImg(imgRef.current, completedCrop, zoom, rotation);
            if (file) {
                onCropComplete(file);
            }
        } catch (e) {
            console.error("Crop failed", e);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', flexDirection: 'column',
            backgroundColor: 'rgba(15, 23, 42, 0.98)',
        }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: isMobile ? '12px 16px' : '16px 24px', backgroundColor: '#1e293b', borderBottom: '1px solid #334155' }}>
                <h2 style={{ color: '#fff', fontSize: isMobile ? '16px' : '18px', fontWeight: 700, margin: 0 }}>Crop & Adjust</h2>
                <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}>
                    <X size={isMobile ? 22 : 26} />
                </button>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '10px' : '24px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ 
                    maxHeight: '100%', maxWidth: '100%', 
                    overflow: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                    <ReactCrop
                        crop={crop}
                        onChange={(_, percentCrop) => setCrop(percentCrop)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspectRatio}
                        // Customize react-image-crop handles to match the user's desire ("points / kone par")
                        style={{ border: '2px dashed rgba(255,255,255,0.4)', borderRadius: '4px' }}
                    >
                        <img
                            ref={imgRef}
                            alt="Crop preview"
                            src={imageSrc}
                            onLoad={onImageLoad}
                            style={{ 
                                transform: `scale(${zoom}) rotate(${rotation}deg)`, 
                                transition: 'transform 0.1s', 
                                maxWidth: '100%', 
                                maxHeight: '60vh',
                                objectFit: 'contain'
                            }}
                        />
                    </ReactCrop>
                </div>
            </div>

            <div style={{ 
                backgroundColor: '#fff', 
                borderTopLeftRadius: '24px', borderTopRightRadius: '24px',
                padding: isMobile ? '16px 20px 24px' : '24px 32px',
                boxShadow: '0 -4px 20px rgba(0,0,0,0.1)'
            }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '16px' : '20px' }}>
                    
                    {/* Controls */}
                    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '16px' : '24px' }}>
                        {/* Rotate */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <RotateCw size={14} color="#64748b" />
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Rotate</span>
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>{rotation}°</span>
                            </div>
                            <input 
                                type="range" min="0" max="360" value={rotation} 
                                onChange={(e) => setRotation(Number(e.target.value))}
                                style={{ width: '100%', accentColor: '#4f46e5', height: '6px' }}
                            />
                        </div>

                        {/* Zoom */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <ZoomIn size={14} color="#64748b" />
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Zoom In</span>
                                </div>
                                <span style={{ fontSize: '12px', fontWeight: 700, color: '#3b82f6', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>{zoom.toFixed(1)}x</span>
                            </div>
                            <input 
                                type="range" min="0.5" max="3" step="0.1" value={zoom} 
                                onChange={(e) => setZoom(Number(e.target.value))}
                                style={{ width: '100%', accentColor: '#4f46e5', height: '6px' }}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '4px' }}>
                        <button 
                            onClick={onClose}
                            style={{ 
                                padding: isMobile ? '12px' : '14px 24px', 
                                background: '#f1f5f9', color: '#475569', borderRadius: '12px', border: 'none', 
                                fontSize: '15px', fontWeight: 700, cursor: 'pointer', flex: 1 
                            }}
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSaveCrop}
                            disabled={isSaving}
                            style={{ 
                                padding: isMobile ? '12px' : '14px 24px', 
                                background: '#4f46e5', color: '#fff', borderRadius: '12px', border: 'none', 
                                fontSize: '15px', fontWeight: 700, cursor: 'pointer', flex: 2, 
                                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' 
                            }}
                        >
                            {isSaving ? 'Saving...' : 'Confirm Crop'}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
