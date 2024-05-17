Certainly! Below is a README.md file describing the entities and their relationships in your project:

---

# File Management System

This project implements a file management system with entities representing users, folders, and files. It utilizes Spring Data JPA for data access and incorporates auditing features for automatic population of creation and update timestamps.

## Entities

### User Entity

- Maps to the "users" table.
- Each attribute of the User entity corresponds to a column in the "users" table.
- The `id` attribute is the primary key.
- There is a unique constraint on the `email` column.
- Utilizes Spring Data JPA's auditing feature (`@CreatedDate` and `@LastModifiedDate`) for automatic population of `createdAt` and `updatedAt` fields.

### Folder Entity

- Maps to the "folders" table.
- The `id` attribute is the primary key.
- The `user_id` column establishes a many-to-one relationship with the User entity.
- The `parent_folder_id` column establishes a many-to-one relationship with itself, representing the parent folder.
- Contains OneToMany relationships with both File and Folder entities, indicating that a folder can contain multiple files and subfolders.

### File Entity

- Maps to the "files" table.
- The `id` attribute is the primary key.
- The `parent_folder_id` column establishes a many-to-one relationship with the Folder entity.
- Contains attributes representing file metadata such as name, type, size, URL, and flags for archiving and favoriting.

## Usage

This section can include instructions on how to set up and run the project, as well as any additional information that users may need to know.

## Contributing

If you'd like to contribute to this project, please follow the guidelines outlined in CONTRIBUTING.md.

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to customize this README.md file further to suit your project's specific needs!