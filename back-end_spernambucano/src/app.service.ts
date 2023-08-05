import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {

  GetAll(): string {
    return "All!";
  }

  PostCreateNew(): string {
    return "Create New";
  }

  PutRewrite(): string {
    return "Rewrite";
  }

  Delete(): string {
    return "Delete";
  }

  DeleteAll(): string {
    return "Delete All";
  }

  Get(): string {
    return "!";
  }
}