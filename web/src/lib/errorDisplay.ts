import type { Dictionary } from '../i18n';
import { LocalApiError } from './apiClient';

export type ReportErrorDetails = {
  description: string;
  hint?: string;
  status?: number;
  title: string;
};

export function formatReportErrorDetails(details: ReportErrorDetails, t: Dictionary) {
  return [details.title, details.description, typeof details.status === 'number' ? `${t.report.errorStatusLabel}: ${details.status}` : '', details.hint]
    .filter(Boolean)
    .join('\n');
}

export function getReportErrorDetails(error: unknown, t: Dictionary): ReportErrorDetails {
  if (error instanceof LocalApiError) {
    if (error.status === 400 && /too long/i.test(error.message)) {
      return {
        description: t.report.errors.inputTooLongDescription,
        status: error.status,
        title: t.report.errors.inputTooLongTitle
      };
    }

    if (error.status === 403) {
      return {
        description: t.report.errors.accessCodeDescription,
        status: error.status,
        title: t.report.errors.accessCodeTitle
      };
    }

    if (error.status === 504) {
      return {
        description: t.report.errors.timeoutDescription,
        hint: error.hint || t.report.errors.timeoutHint,
        status: error.status,
        title: t.report.errors.timeoutTitle
      };
    }

    if (/not configured/i.test(error.message)) {
      return {
        description: t.report.errors.serverConfigDescription,
        status: error.status,
        title: t.report.errors.serverConfigTitle
      };
    }

    return {
      description: error.message || t.report.errorDescription,
      hint: t.report.difyErrorHint,
      status: error.status,
      title: t.report.errors.unknownTitle
    };
  }

  if (error instanceof Error && error.message) {
    return {
      description: error.message,
      hint: t.report.difyErrorHint,
      title: t.report.errors.unknownTitle
    };
  }

  return {
    description: t.report.errors.networkDescription,
    title: t.report.errors.networkTitle
  };
}
