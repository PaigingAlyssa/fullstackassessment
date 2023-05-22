package com.pebblepost.todo;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.stream.IntStream;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import static org.hamcrest.Matchers.notNullValue;
import static org.hamcrest.Matchers.equalTo;
@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class TodoControllerTest {
    private final static int numberOfTestTodos = 10;
    private final static String testDescription = "Nulla vitae elit libero, a pharetra augue.";

    @Autowired
    private MockMvc mockMvc;

    @Autowired TodoRepository todoRepository;

    @BeforeEach
    void addTodos() {
        IntStream.range(1, numberOfTestTodos + 1).forEach(value -> {
            final Todo newTodo = new Todo();
            newTodo.setStatus(TodoStatus.INCOMPLETE);
            newTodo.setDescription(testDescription + " " + value);
            Todo save = this.todoRepository.save(newTodo);
        });
    }

    @Test
    void create() throws Exception {
        final TodoDto dto = testTodoDto(null);
        final String json = new ObjectMapper().writeValueAsString(dto);
        this.mockMvc.perform(post("/todos", dto)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.description", equalTo(testDescription)))
                .andExpect(jsonPath("$.status", equalTo(TodoStatus.INCOMPLETE.toString())));
    }

    @Test
    void getAll() throws Exception {
        this.mockMvc.perform(get("/todos").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.length()", equalTo(numberOfTestTodos)));
    }

    @Test
    void getOne() throws Exception {
        this.mockMvc.perform(get("/todos/1").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.id", equalTo(1)))
                .andExpect(jsonPath("$.description", equalTo(testDescription + " " + 1)))
                .andExpect(jsonPath("$.status", equalTo(TodoStatus.INCOMPLETE.toString())));
    }

    @Test
    void getOne_notFound() throws Exception {
        this.mockMvc.perform(get("/todos/1000000").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    void putOne() throws Exception {
        final String modifiedString = "my updated description";
        final TodoDto dto = testTodoDto(1L);
        dto.setDescription(modifiedString);

        final String json = new ObjectMapper().writeValueAsString(dto);

        this.mockMvc.perform(put("/todos/1", dto)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.id", notNullValue()))
                .andExpect(jsonPath("$.description", equalTo(modifiedString)))
                .andExpect(jsonPath("$.status", equalTo(TodoStatus.INCOMPLETE.toString())));
    }

    @Test
    void putOne_isNotFound() throws Exception {
        final String modifiedString = "my updated description";
        final TodoDto dto = testTodoDto(1L);
        dto.setDescription(modifiedString);

        final String json = new ObjectMapper().writeValueAsString(dto);

        this.mockMvc.perform(put("/todos/1000000", dto)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isNotFound());
    }
    @Test
    void delete() throws Exception {
        this.mockMvc.perform(MockMvcRequestBuilders.delete("/todos/10"))
                .andExpect(status().isOk());

        this.mockMvc.perform(get("/todos/10").contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    private static TodoDto testTodoDto(Long id) {
        final TodoDto testTodoDto = new TodoDto();
        testTodoDto.setId(id);
        testTodoDto.setStatus(TodoStatus.INCOMPLETE);
        testTodoDto.setDescription(testDescription);
        return testTodoDto;
    }
}
