import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from "uuid";

// Create a Supabase client
function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};

export const uploadImage = async ({ file, bucket, folder }: UploadProps) => {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

  // Compress image if browser-image-compression is available
  try {
    if (typeof window !== 'undefined') {
      // Dynamically import the compression library only in browser
      const imageCompression = (await import('browser-image-compression')).default;
      file = await imageCompression(file, {
        maxSizeMB: 1,
      });
    }
  } catch (error) {
    console.error("Image compression failed:", error);
    // Continue with upload even if compression fails
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false
  });

  if (error) {
    console.error("Image upload error:", error);
    return { imageUrl: "", error: "Image upload failed: " + error.message };
  }

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data?.path}`;

  return { imageUrl, error: "" };
};

export const deleteImage = async (imageUrl: string) => {
  if (!imageUrl || !imageUrl.includes('/storage/v1/object/public/')) {
    return { data: null, error: "Invalid image URL format" };
  }
  
  const bucketAndPathString = imageUrl.split("/storage/v1/object/public/")[1];
  if (!bucketAndPathString) {
    return { data: null, error: "Could not extract bucket and path from URL" };
  }
  
  const firstSlashIndex = bucketAndPathString.indexOf("/");
  if (firstSlashIndex === -1) {
    return { data: null, error: "Could not parse image path" };
  }

  const bucket = bucketAndPathString.slice(0, firstSlashIndex);
  const path = bucketAndPathString.slice(firstSlashIndex + 1);

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).remove([path]);

  if (error) {
    console.error("Image deletion error:", error);
    return { data: null, error: "Failed to delete image: " + error.message };
  }

  return { data, error: null };
};

// Export the createSupabaseClient function for use in other files
export { createSupabaseClient };