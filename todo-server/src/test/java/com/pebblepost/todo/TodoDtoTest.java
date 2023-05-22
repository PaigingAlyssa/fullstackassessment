package com.pebblepost.todo;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
class TodoDtoTest {
    private static String description = "Cras justo odio, dapibus ac facilisis in, egestas eget quam.";
    @Test
    void toEntity() {
        final TodoDto dto = new TodoDto();
        dto.setDescription(description);
        dto.setId(1L);
        dto.setStatus(TodoStatus.COMPLETE);

        final Todo result = TodoDto.toEntity(dto);
        assertThat(result.getId()).isEqualTo(dto.getId());
        assertThat(result.getDescription()).isEqualTo(dto.getDescription());
        assertThat(result.getStatus()).isEqualTo(dto.getStatus());
    }

    @Test
    void fromEntity() {
        final Todo entity = new Todo();
        entity.setId(1L);
        entity.setDescription(description);
        entity.setStatus(TodoStatus.COMPLETE);

        final TodoDto result = TodoDto.fromEntity(entity);
        assertThat(result.getId()).isEqualTo(entity.getId());
        assertThat(result.getDescription()).isEqualTo(entity.getDescription());
        assertThat(result.getStatus()).isEqualTo(entity.getStatus());
    }
}
