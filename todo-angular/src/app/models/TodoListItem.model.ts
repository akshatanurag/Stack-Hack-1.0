export class TodoListItem {
    _id: string;
    title: string;
    created_on: number = Date.now();
    due_on: number;
    completed_on: number;
    label: string;
    priority: number;
    is_completed: boolean = false;
}