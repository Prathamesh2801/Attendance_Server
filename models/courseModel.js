// models/courseModel.js
import db from "../config/db.js";

export async function findPersuingSubjects(studentId, course) {
  const sql = `
    SELECT subject
    FROM faculty_student
    WHERE nameid = ? AND course = ? AND status = 'Persuing'
  `;
  const [rows] = await db.execute(sql, [studentId, course]);
  return rows;
}

export async function findCompletedSubjects(studentId, course) {
  const sql = `
    SELECT subject
    FROM faculty_student
    WHERE nameid = ? AND course = ? AND status = 'Completed'
  `;
  const [rows] = await db.execute(sql, [studentId, course]);
  return rows;
}

export async function findPendingSubjects(studentId, course) {
  const sql = `
    SELECT s.subjectname AS subjectname
    FROM subject s
    WHERE s.coursename = ?
      AND s.subjectname COLLATE utf8mb4_general_ci NOT IN (
        SELECT fs.subject COLLATE utf8mb4_general_ci
        FROM faculty_student fs
        WHERE fs.nameid = ?
          AND fs.course = ?
          AND fs.status IN ('Completed', 'Persuing')
      )
  `;
  const [rows] = await db.execute(sql, [course, studentId, course]);
  return rows;
}
