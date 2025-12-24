
export type UserRole = 'admin' | 'agent' | 'customer';

export interface Ticket {
    id: number;
    subject: string;
    description: string;
    status_id?: number | null;
    priority_id?: number | null;
    status_name?: string | null;
    priority_name?: string | null;
    created_by?: number;
    assigned_to?: number | null;
    created_at?: string;
    updated_at?: string | null;
}
