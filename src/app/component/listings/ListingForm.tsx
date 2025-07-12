'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";
import { SafeUser } from "@/app/types";

// Define the expected structure of the form data
interface ListingFormData {
  id?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  description?: string;
  universityName?: string;
  lat?: number;
  lng?: number;
  imageGallery?: string[];
}

interface ListingFormProps {
  initialData?: ListingFormData;
  isEdit?: boolean;
  currentUser?: SafeUser;
}

const ListingForm: React.FC<ListingFormProps> = ({
  initialData,
  isEdit = false,
  currentUser,
}) => {
  const router = useRouter();

  const [guestCount, setGuestCount] = useState(initialData?.guestCount || 1);
  const [roomCount, setRoomCount] = useState(initialData?.roomCount || 1);
  const [bathroomCount, setBathroomCount] = useState(initialData?.bathroomCount || 1);
  const [description, setDescription] = useState(initialData?.description || "");
  const [universityName, setUniversityName] = useState(initialData?.universityName || "");
  const [lat, setLat] = useState(initialData?.lat || 0);
  const [lng, setLng] = useState(initialData?.lng || 0);
  const [imageGallery, setImageGallery] = useState<string[]>(initialData?.imageGallery || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploads = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "efficiency_unsigned");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/efficiencyrentu/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.secure_url;
    });

    try {
      const results = await Promise.all(uploads);
      setImageGallery((prev) => [...prev, ...results]);
    } catch {
      toast.error("Image upload failed");
    }
  };

  const handleRemoveImage = (index: number) => {
    setImageGallery((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = {
        guestCount,
        roomCount,
        bathroomCount,
        description,
        universityName,
        lat,
        lng,
        imageGallery,
      };

      if (isEdit && initialData?.id) {
        await axios.put(`/api/listings/${initialData.id}`, payload);
        toast.success("Listing updated!");
      } else {
        await axios.post("/api/listings", payload);
        toast.success("Listing created!");
      }

      router.refresh();
      router.push("/listings");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
        {isEdit ? "Edit Listing" : "Create Listing"}
      </h2>

      {currentUser && (
        <p style={{ fontStyle: "italic", fontSize: "0.9rem" }}>
          Logged in as {currentUser.name || currentUser.email}
        </p>
      )}

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      />

      <input
        type="number"
        placeholder="Guests"
        value={guestCount}
        onChange={(e) => setGuestCount(parseInt(e.target.value))}
        disabled={isLoading}
      />

      <input
        type="number"
        placeholder="Rooms"
        value={roomCount}
        onChange={(e) => setRoomCount(parseInt(e.target.value))}
        disabled={isLoading}
      />

      <input
        type="number"
        placeholder="Bathrooms"
        value={bathroomCount}
        onChange={(e) => setBathroomCount(parseInt(e.target.value))}
        disabled={isLoading}
      />

      <input
        type="text"
        placeholder="University Name"
        value={universityName}
        onChange={(e) => setUniversityName(e.target.value)}
        disabled={isLoading}
      />

      <input
        type="number"
        placeholder="Latitude"
        value={lat}
        onChange={(e) => setLat(parseFloat(e.target.value))}
        disabled={isLoading}
      />

      <input
        type="number"
        placeholder="Longitude"
        value={lng}
        onChange={(e) => setLng(parseFloat(e.target.value))}
        disabled={isLoading}
      />

      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        disabled={isLoading}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {imageGallery.map((url, i) => (
          <div key={i} style={{ position: "relative" }}>
            <Image
              src={url}
              alt={`Uploaded ${i + 1}`}
              width={100}
              height={100}
              style={{
                objectFit: "cover",
                borderRadius: "8px",
              }}
              unoptimized
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(i)}
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        style={{
          padding: "12px 24px",
          backgroundColor: "#2563EB",
          color: "white",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        {isEdit ? "Update Listing" : "Create Listing"}
      </button>
    </div>
  );
};

export default ListingForm;
