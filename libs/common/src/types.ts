export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    images: string[];
}

export interface SegmentRule {
    field: string;
    operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains';
    value: string | number;
}

export interface UserSegment {
    id: number;
    name: string;
    rules: SegmentRule[];
}