package com.rawideas.ems.exception;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDetails> handleValidationErrors(
            HttpServletRequest request, MethodArgumentNotValidException ex) {
        List<String> errors = new ArrayList<>();
        for (FieldError error : ex.getBindingResult().getFieldErrors()) {
            String field = error.getField();
            String message = switch (Objects.requireNonNull(error.getCode())) {
                case "NotBlank", "NotEmpty" -> field + " must not be blank.";
                case "NotNull" -> (field.equals("departmentId") ? "Department" : field) + " must not be null.";
                case "Email" -> field + " is not a valid email address.";
                default -> error.getDefaultMessage();
            };
            errors.add(message);
        }
        return buildErrorResponse(HttpStatus.BAD_REQUEST, "Validation Failed", errors);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ErrorDetails> handleUniqueConstraintViolation(
            HttpServletRequest request, DataIntegrityViolationException ex) {
        String message = "Duplicate entry. Please check for unique constraints.";
        return buildErrorResponse(HttpStatus.CONFLICT, message, null);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleOtherExceptions(
            HttpServletRequest request, Exception ex) {
        String message = "Internal Server Error";
        return buildErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, message, null);
    }

    private ResponseEntity<ErrorDetails> buildErrorResponse(
            HttpStatus status, String message, List<String> errors) {
        ErrorDetails errorDetails = new ErrorDetails(status.value(), message, errors, LocalDateTime.now());
        return ResponseEntity.status(status).body(errorDetails);
    }
    // Define an error details class
    public static class ErrorDetails {
        private int status;
        private String message;
        private List<String> errors;
        private LocalDateTime timestamp;

        public ErrorDetails(int status, String message, List<String> errors, LocalDateTime timestamp) {
            this.status = status;
            this.message = message;
            this.errors = errors;
            this.timestamp = timestamp;
        }

        public int getStatus() {
            return status;
        }

        public void setStatus(int status) {
            this.status = status;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public List<String> getErrors() {
            return errors;
        }

        public void setErrors(List<String> errors) {
            this.errors = errors;
        }

        public LocalDateTime getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
        }
    }
}

