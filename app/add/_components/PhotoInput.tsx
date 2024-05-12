"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Pen, Dog } from "lucide-react";
import { useFormContext } from "react-hook-form";
export default function ProfilePic() {
  const [src, setSrc] = useState(false);
  const { register, watch, setValue } = useFormContext();
  useEffect(() => {
    const img = document.getElementById(
      "pictureImg",
    ) as HTMLImageElement | null;
    if (watch("URL")?.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (img !== null && e.target !== null && e.target.result !== null) {
          img.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(watch("URL")[0]);
      setSrc(true);
    }
  }, [watch("URL")]);
  const handleChange = (e: any) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.getElementById(
        "pictureImg",
      ) as HTMLImageElement | null;
      if (typeof e.target?.result === "string" && img) {
        img.src = e?.target.result;
      }
    };

    reader.readAsDataURL(file);
    setValue("URL", e.target.files);
    setSrc(true);
  };
  return (
    <div className="flex justify-center" aria-label="first-section">
      <input
        id="URL"
        type="file"
        hidden={true}
        {...register("URL", { required: true })}
      />
      <label htmlFor="URL" className="hover:cursor-pointer">
        <div
          className={`group rounded-full size-[350px] grid place-items-center bg-gray-400 hover:bg-gray-800 ${src ? "hover:opacity-60" : ""} transition-all`}
        >
          <Image
            src=""
            alt="profile pic"
            width={350}
            height={350}
            style={{
              borderColor: watch("MainColor"),
              border: "10px solid",
            }}
            className={`size-[350px] rounded-full object-cover ${src ? "" : "hidden"}`}
            id="pictureImg"
          />
          <Dog
            size={80}
            className={`size-[200px] absolute group-hover:opacity-0 ${src ? "hidden" : ""}`}
          />
          <Pen
            size={80}
            className="size-[200px] absolute opacity-0 group-hover:block group-hover:opacity-100 transition-all"
          />
        </div>
      </label>
    </div>
  );
}
