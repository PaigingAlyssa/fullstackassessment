package com.pebblepost.todo;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TodoDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    private String description;

    @JsonProperty(access = JsonProperty.Access.READ_WRITE)
    private TodoStatus status = TodoStatus.INCOMPLETE;
    public TodoDto() {}

    public TodoDto(Long id, String description, TodoStatus status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TodoStatus getStatus() {
        return status;
    }

    public void setStatus(TodoStatus status) {
        this.status = status;
    }

    public static TodoDto fromEntity(Todo todo) {
        return TodoDto
                .builder()
                .setId(todo.getId())
                .setDescription(todo.getDescription())
                .setStatus(todo.getStatus())
                .build();
    }

    public static Todo toEntity(TodoDto dto) {
        return Todo
                .builder()
                .setId(dto.id)
                .setDescription(dto.description)
                .setStatus(dto.status).build();
    }

    private static Builder builder() {
        return new Builder();
    }

    private static class Builder {
        private Long id;
        private String description;
        private TodoStatus status;
        public TodoDto build() {
            return new TodoDto(this.id, this.description, this.status);
        }

        public Builder setId(Long id){
            this.id = id;
            return this;
        }

        public Builder setDescription(String description) {
            this.description = description;
            return this;
        }

        public Builder setStatus(TodoStatus status) {
            this.status = status;
            return this;
        }
    }
}
