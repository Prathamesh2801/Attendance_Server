// models/batchModel.js
import db from "../config/db.js";

export async function findFacultyStudentByStatus(studentId, course, status) {
  const sql = `
    SELECT *
    FROM faculty_student
    WHERE (nameid = ? OR studentid = ?)
      AND course = ?
      AND status = ?
  `;
  const [rows] = await db.execute(sql, [studentId, studentId, course, status]);
  return rows;
}

export async function findPendingSubjects(studentId, course) {
  const sql = `
    SELECT s.subjectname
    FROM subject s
    WHERE s.coursename = ?
      AND s.subjectname COLLATE utf8mb4_unicode_ci NOT IN (
        SELECT fs.subject COLLATE utf8mb4_unicode_ci
        FROM faculty_student fs
        WHERE (fs.nameid = ? OR fs.studentid = ?)
          AND fs.course = ?
          AND fs.status IN ('Completed', 'Persuing')
      )
  `;
  const [rows] = await db.execute(sql, [course, studentId, studentId, course]);
  return rows;
}
