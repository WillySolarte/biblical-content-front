import { isAxiosError } from "axios";
import type { ZodSchema, z } from "zod";
import api from "../config/axios";
import { StandarResponseSchema } from "@/common/schemas/general.schema";


export class ApiError extends Error {
    status?: number
    constructor(message: string, status?: number) {
        super(message);
        this.name = "ApiError";
        this.status = status
    }
}

function handleApiError(error: unknown): never {
    if (isAxiosError(error)) {
        if (error.response) {
            const responseData = error.response.data as { message?: string } | undefined;
            throw new ApiError(responseData?.message ?? "Error en la solicitud", error.response.status,);
        }
        if (error.request) {
            throw new ApiError("No se pudo conectar con el servidor");
        }
    }
    throw error;
}

export async function apiGet<TSchema extends ZodSchema>(url: string, schema: TSchema): Promise<z.infer<TSchema>> {
    try {
        const { data } = await api.get<unknown>(url);
        const result = schema.safeParse(data);

        if (result.success) {
            return result.data;
        }

        throw new ApiError("Esquema no valido");
    } catch (error) {
        return handleApiError(error);
    }
}

export async function apiGetNestedData<T>(url: string, schema: ZodSchema<{ data: T }>): Promise<T> {
    try {
        const { data } = await api.get<unknown>(url);
        const result = schema.safeParse(data);

        if (result.success) {
            return result.data.data;
        }

        throw new ApiError("Esquema no valido");
    } catch (error) {
        return handleApiError(error);
    }
}

export async function apiPost<TSchema extends ZodSchema>(url: string, body: unknown, schema: TSchema): Promise<z.infer<TSchema>> {
    try {
        const { data } = await api.post<unknown>(url, body);
        const result = schema.safeParse(data);

        if (result.success) {
            return result.data;
        }

        throw new ApiError("Esquema no valido");
    } catch (error) {
        return handleApiError(error);
    }
}

export async function apiPostNestedData<T>(url: string, body: unknown,  schema: ZodSchema<{ data: T }>): Promise<T> {
    try {
        const { data } = await api.post<unknown>(url, body);
        const result = schema.safeParse(data);

        if (result.success) {
            return result.data.data;
        }

        throw new ApiError("Esquema no valido");
    } catch (error) {
        return handleApiError(error);
    }
}

export async function apiPatch(url: string, body: unknown): Promise<z.infer<typeof StandarResponseSchema>> {
    try {
        const { data } = await api.patch<unknown>(url, body);
        const result = StandarResponseSchema.safeParse(data);

        if (result.success) {
            return result.data;
        }

        throw new ApiError("Esquema no valido");
    } catch (error) {
        return handleApiError(error);
    }
}

export async function apiDelete(url: string): Promise<z.infer<typeof StandarResponseSchema>> {
    try {
        const { data } = await api.delete<unknown>(url);
        const result = StandarResponseSchema.safeParse(data);

        if (result.success) {
            return result.data;
        }

        throw new ApiError("Esquema no valido");
    } catch (error) {
        return handleApiError(error);
    }
}
