import { type Request, type Response } from 'express';
import { getSupabaseClient } from '../config/database';

export const getVocabulariesByLesson = async (
  req: Request<{ lessonId: string }>,
  res: Response,
): Promise<void> => {
  try {
    const { lessonId } = req.params;

    const { data, error } = await getSupabaseClient()
      .from('vocabularies')
      .select('*')
      .eq('lesson_id', lessonId);

    if (error) {
      console.error('Failed to fetch vocabularies from Supabase:', error.message);
      res.status(500).json({ success: false, message: 'Failed to fetch vocabularies.' });
      return;
    }

    res.status(200).json({ success: true, data });
  } catch (error: unknown) {
    console.error('Unexpected error while fetching vocabularies:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};