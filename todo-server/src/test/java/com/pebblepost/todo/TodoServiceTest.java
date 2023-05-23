package com.pebblepost.todo;

import javassist.NotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;


import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@RunWith(SpringRunner.class)
@SpringBootTest
class TodoServiceTest {
    private final static String testDescription = "Nulla vitae elit libero, a pharetra augue.";

    @MockBean
    private TodoRepository todoRepository;

    @Autowired
    private TodoService todoService;

    @Test
    void createTodo() {
        final Todo testTodo = testTodo(1L);
        given(this.todoRepository.save(testTodo)).willReturn(testTodo);
        final Todo todo = todoService.createTodo(testTodo);

        verify(todoRepository, times(1)).save(testTodo);
        assertThat(todo.getDescription()).isEqualTo(testDescription);
        assertThat(todo.getStatus()).isEqualTo(TodoStatus.INCOMPLETE);
        assertThat(todo.getId()).isNotNull();
    }

    @Test
    void getTodos() {
        final List<Todo> todos = Arrays.asList(testTodo(1L), testTodo(2L), testTodo(3L));
        given(this.todoRepository.findAll()).willReturn(todos);

        final List<Todo> result = this.todoService.getTodos();
        verify(todoRepository, times(1)).findAll();
        assertThat(result.size()).isEqualTo(todos.size());
        assertThat(result.containsAll(todos)).isTrue();
    }

    @Test
    void getTodo() throws NotFoundException {
        final Todo testTodo = testTodo(1L);
        given(this.todoRepository.findById(1L)).willReturn(Optional.of(testTodo));

        final Todo result = todoService.getTodo(1L);
        verify(todoRepository, times(1)).findById(1L);
        assertThat(result).isEqualTo(testTodo);
    }

    @Test
    void getTodo_NotFoundException() throws NotFoundException {
        given(this.todoRepository.findById(1L)).willReturn(Optional.ofNullable(null));

        assertThrows(NotFoundException.class, () -> todoService.getTodo(1L));
        verify(todoRepository, times(1)).findById(1L);
    }
    @Test
    void updateTodo() throws NotFoundException {
        final Todo testTodo = testTodo(1L);

        given(this.todoRepository.findById(1L)).willReturn(Optional.of(testTodo));
        given(this.todoRepository.save(testTodo)).willReturn(testTodo);

        final Todo result = this.todoService.updateTodo(testTodo.getId(), testTodo);
        verify(todoRepository, times(1)).save(testTodo);
        assertThat(result.getId()).isEqualTo(testTodo.getId());
        assertThat(result.getDescription()).isEqualTo(testTodo.getDescription());
        assertThat(result.getStatus()).isEqualTo(testTodo.getStatus());
    }

    @Test
    void updateTodo_NotFoundException() throws NotFoundException {
        final Todo testTodo = testTodo(1L);
        given(this.todoRepository.findById(1L)).willReturn(Optional.ofNullable(null));

        verify(todoRepository, times(0)).save(testTodo);
        assertThrows(NotFoundException.class, () -> todoService.updateTodo(testTodo.getId(), testTodo));
    }
    @Test
    void deleteTodo() {
        final Todo testTodo = testTodo(1L);
        this.todoService.deleteTodo(1L);
        verify(todoRepository, times(1)).deleteById(1L);
    }

    private static Todo testTodo(Long id) {
        final Todo testTodo = new Todo();
        testTodo.setId(id);
        testTodo.setStatus(TodoStatus.INCOMPLETE);
        testTodo.setDescription(testDescription);
        return testTodo;
    }
}
