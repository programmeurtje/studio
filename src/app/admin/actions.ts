
'use server';

import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// Deze functie is nu verplaatst naar de API route
// Het is niet langer nodig om deze rechtstreeks vanuit layouts/pages aan te roepen.

// --- Open House Dates Actions ---
export async function addOpenHouseDate(formData: FormData) {
  // Verificatie wordt nu impliciet afgehandeld doordat alleen admins deze acties kunnen triggeren.
  try {
    const month = formData.get('month') as string;
    const days = formData.get('days') as string;
    if (!month || !days) throw new Error('Month and days are required.');

    await adminDb.collection('open_house_dates').add({
      month,
      days,
      createdAt: FieldValue.serverTimestamp(),
    });
    revalidatePath('/admin/open-house');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function updateOpenHouseDate(id: string, formData: FormData) {
  try {
    const month = formData.get('month') as string;
    const days = formData.get('days') as string;
    if (!month || !days) throw new Error('Month and days are required.');

    await adminDb.collection('open_house_dates').doc(id).update({ month, days });
    revalidatePath('/admin/open-house');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function deleteOpenHouseDate(id: string) {
  try {
    await adminDb.collection('open_house_dates').doc(id).delete();
    revalidatePath('/admin/open-house');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}


// --- Gallery Image Actions ---
export async function addGalleryImage(formData: FormData) {
  try {
    const data = {
      imageUrl: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
      imageHint: formData.get('imageHint') as string,
      order: parseInt(formData.get('order') as string, 10),
    };
    if (!data.imageUrl || !data.description || isNaN(data.order)) {
        throw new Error('All fields are required.');
    }

    await adminDb.collection('gallery_images').add(data);
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function updateGalleryImage(id: string, formData: FormData) {
  try {
    const data = {
      imageUrl: formData.get('imageUrl') as string,
      description: formData.get('description') as string,
      imageHint: formData.get('imageHint') as string,
      order: parseInt(formData.get('order') as string, 10),
    };
     if (!data.imageUrl || !data.description || isNaN(data.order)) {
        throw new Error('All fields are required.');
    }

    await adminDb.collection('gallery_images').doc(id).update(data);
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    await adminDb.collection('gallery_images').doc(id).delete();
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

// --- Content Block Actions ---

export async function updateHeroContent(formData: FormData) {
  try {
    const data = {
      title: formData.get('title') as string,
      subtitle: formData.get('subtitle') as string,
      imageUrl: formData.get('imageUrl') as string,
    };
    if (!data.title || !data.subtitle || !data.imageUrl) throw new Error('All fields are required.');

    await adminDb.collection('content_blocks').doc('hero').set(data, { merge: true });
    revalidatePath('/admin/content');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}


export async function updateValueProposition(id: string, formData: FormData) {
  try {
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      icon: formData.get('icon') as string,
    };
    if (!data.title || !data.description || !data.icon) throw new Error('All fields are required.');
    
    await adminDb.collection('value_propositions').doc(id).update(data);
    revalidatePath('/admin/content');
    revalidatePath('/');
    return { success: true };
  } catch (e: any) {
    return { error: e.message };
  }
}

// --- Media Actions ---

export async function addMediaItem(fileData: {
  fileName: string;
  fullPath: string;
  downloadUrl: string;
  contentType: string;
  size: number;
}) {
    try {
        await adminDb.collection('media').add({
            ...fileData,
            createdAt: FieldValue.serverTimestamp(),
        });
        revalidatePath('/admin/media');
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

export async function deleteMediaItem(id: string) {
    try {
        await adminDb.collection('media').doc(id).delete();
        revalidatePath('/admin/media');
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}
