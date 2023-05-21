package com.pebblepost.todo;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    Todo createTodo(Todo newTodo) {
        return this.todoRepository.save(newTodo);
    }

    public List<Todo> getTodos() {
        return this.todoRepository.findAll();
    }

    public Todo getTodo(Long id) throws NotFoundException {
        final Optional<Todo> byId = this.todoRepository.findById(id);
        if(byId.isEmpty()){
            throw new NotFoundException("Unable to find todo by id: " + id);
        }
        return byId.get();
    }

    public Todo updateTodo(Long id, Todo updatedTodo) throws NotFoundException {
        final Todo todo = this.getTodo(id);
        todo.setDescription(updatedTodo.getDescription());
        todo.setStatus(updatedTodo.getStatus());
        return this.todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        this.todoRepository.deleteById(id);
    }
}
