import { Router } from 'express';
import { getVocabulariesByLesson } from '../controllers/vocabularyController';

const router = Router();

/**
 * @swagger
 * /api/v1/lessons/{lessonId}/vocabularies:
 *   get:
 *     summary: Get vocabularies by lesson ID
 *     description: Retrieve a list of Chinese vocabularies belonging to a specific lesson.
 *     parameters:
 *       - in: path
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the lesson
 *     responses:
 *       200:
 *         description: Successfully retrieved vocabulary list.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Failed to retrieve vocabularies.
 */
router.get('/lessons/:lessonId/vocabularies', getVocabulariesByLesson);

export default router;