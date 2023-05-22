package com.pebblepost.todo;

import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/todos")
public class TodoController {

    private final TodoService todoService;

    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TodoDto create(@RequestBody TodoDto createDto) {
        final Todo newTodo = this.todoService.createTodo(TodoDto.toEntity(createDto));
        return TodoDto.fromEntity(newTodo);
    }

    @GetMapping
    public List<TodoDto> getAll() {
        return this.todoService.getTodos().stream().map(todo -> TodoDto.fromEntity(todo)).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public TodoDto getOne(@PathVariable("id") Long id) {
        try {
            return TodoDto.fromEntity(this.todoService.getTodo(id));
        } catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @ResponseStatus(value = HttpStatus.OK)
    public TodoDto put(@PathVariable("id") Long id, @RequestBody TodoDto updated) {
        try {
            return TodoDto.fromEntity(this.todoService.updateTodo(id, TodoDto.toEntity(updated)));
        } catch (NotFoundException e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, e.getMessage());
        }
    }

    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable("id") Long id) {
        this.todoService.deleteTodo(id);
    }
}
