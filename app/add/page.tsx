"use client";
import { HexColorPicker } from "react-colorful";
import PhotoInput from "./_components/PhotoInput";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextInputs from "./_components/TextInputs";
import { useUploadThing } from "../_utils/uploadthing";
import { Spinner } from "@nextui-org/react";
export default function AddPage() {
  const [color, setColor] = useState("#121212");
  const [uploading, setUploading] = useState(false);
  const methods = useForm();

  const { startUpload } = useUploadThing("imageUploader", {
    onUploadBegin: () => {
      setUploading(true);
    },
    onClientUploadComplete: () => {
      setUploading(false);
    },
    onUploadError: () => {
      setUploading(false);
      alert("Error uploading image");
    },
  });
  useEffect(() => {
    methods.setValue("MainColor", color);
  }, [color]);
  const onSubmit = async (data: any) => {
    const files = Object.keys(data).reduce((acc: File[], key) => {
      if (data[key] instanceof FileList || data[key] instanceof File) {
        acc.push(...Array.from(data[key] as FileList));
        delete data[key];
      }
      return acc;
    }, []);
    const resPictures = await startUpload(files);
    const pictures = resPictures?.map((res) => res.url || "")[0];
    if (resPictures) {
      const res = await fetch("/api/pokemon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, URL: pictures }),
      });
      if (res.ok) {
        alert("Added successfully");
        methods.reset();
      } else {
        alert("Error adding");
      }
    }
  };
  return (
    <main className="py-24 bg-white overflow-hidden">
      <section className={uploading ? "hidden" : ""}>
        <FormProvider {...methods}>
          <form className="flex" onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex items-center justify-center flex-col px-16 w-1/2 gap-4">
              <TextInputs />
            </div>
            <div className="flex flex-col items-center justify-center px-16 w-1/2 gap-4">
              <PhotoInput />
              <HexColorPicker onChange={setColor} />
            </div>
          </form>
        </FormProvider>
      </section>
      <section
        className={
          uploading
            ? "flex w-screen h-screen bg-blue-50 overflow-hidden"
            : "hidden"
        }
      >
        <div className="scale-150 z-10">
          <Spinner size="lg" />
        </div>
      </section>
    </main>
  );
}
