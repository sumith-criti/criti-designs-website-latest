'use client';
import { useEffect, useRef, useState } from 'react';

interface CKEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function CKEditor({ value, onChange }: CKEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstance = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  // 1. Script Loader
  useEffect(() => {
    if ((window as any).ClassicEditor) {
      setLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.ckeditor.com/ckeditor5/41.1.0/classic/ckeditor.js';
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    // No cleanup required here to avoid double-destroy race conditions
  }, []);

  // 2. Editor Initializer
  useEffect(() => {
    if (!loaded || !editorRef.current || editorInstance.current) return;

    // Define custom upload adapter class for Base64 image uploads
    class Base64UploadAdapter {
      loader: any;
      constructor(loader: any) {
        this.loader = loader;
      }
      upload() {
        return this.loader.file.then(
          (file: File) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => {
                resolve({ default: reader.result });
              };
              reader.onerror = (err) => reject(err);
              reader.readAsDataURL(file);
            })
        );
      }
      abort() {}
    }

    // Define upload adapter plugin
    function Base64UploadAdapterPlugin(editor: any) {
      editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
        return new Base64UploadAdapter(loader);
      };
    }

    (window as any).ClassicEditor.create(editorRef.current, {
      extraPlugins: [Base64UploadAdapterPlugin],
      heading: {
        options: [
          { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
          { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
          { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
          { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
        ]
      }
    })
      .then((editor: any) => {
        editorInstance.current = editor;
        editor.setData(value);
        editor.model.document.on('change:data', () => {
          onChange(editor.getData());
        });
      })
      .catch((error: any) => {
        console.error('CKEditor initialization error:', error);
      });

    // Clean up editor instance safely on unmount
    return () => {
      if (editorInstance.current) {
        const instance = editorInstance.current;
        editorInstance.current = null; // nullify pointer immediately to prevent duplicate triggers
        
        try {
          instance.destroy()
            .catch((err: any) => {
              console.warn('CKEditor async destroy warning:', err);
            });
        } catch (err) {
          console.warn('CKEditor sync destroy warning:', err);
        }
      }
    };
  }, [loaded]);

  return (
    <div className="bg-white border border-gray-300 rounded-md overflow-hidden min-h-[300px] text-black">
      <div ref={editorRef} className="prose max-w-none min-h-[250px]" />
    </div>
  );
}
