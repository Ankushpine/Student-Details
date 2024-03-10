package com.pine.Student.System.Service;

import com.pine.Student.System.Models.Student;

import java.util.List;

public interface StudentService {

    public Student saveStudent(Student student);
    public List<Student> getAllStudents();


}
