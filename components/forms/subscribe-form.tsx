"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";

const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해 주세요.")
    .email("올바른 이메일 형식으로 입력해 주세요."),
  consentRequired: z.boolean().refine((v) => v === true, {
    message: "개인정보 수집·이용에 동의해야 구독할 수 있습니다.",
  }),
  consentMarketing: z.boolean(),
  ageConfirmed: z.boolean().refine((v) => v === true, {
    message: "14세 이상 확인이 필요합니다.",
  }),
});

type SubscribeFormValues = z.infer<typeof subscribeSchema>;

interface SubscribeFormProps {
  source?: string;
  /** 광고성 정보 수신 동의 체크박스 문구에 "(선택)" 레이블을 표시합니다 */
  showMarketingConsent?: boolean;
  className?: string;
}

export function SubscribeForm({
  source,
  showMarketingConsent = true,
  className,
}: SubscribeFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeFormValues>({
    resolver: zodResolver(subscribeSchema),
    defaultValues: {
      email: "",
      consentRequired: false,
      consentMarketing: false,
      ageConfirmed: false,
    },
  });

  const onSubmit = async (data: SubscribeFormValues) => {
    setStatus("loading");
    setServerMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          consentRequired: data.consentRequired,
          consentMarketing: data.consentMarketing,
          ageConfirmed: data.ageConfirmed,
          source,
        }),
      });

      const json = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus("success");
        setServerMessage(json.message ?? "구독이 완료되었습니다. 환영합니다!");
        reset();
      } else {
        setStatus("error");
        setServerMessage(json.message ?? "오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      }
    } catch {
      setStatus("error");
      setServerMessage("네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-[var(--radius-card)] border border-[var(--brand-border)] bg-[var(--brand-bg)] p-6 text-center",
          className,
        )}
      >
        <div className="mb-3 text-3xl" aria-hidden="true">
          🐾
        </div>
        <p className="font-semibold text-[var(--brand-text)] text-lg mb-1">
          구독 완료!
        </p>
        <p className="text-sm text-[var(--brand-text-secondary)]">{serverMessage}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-xs underline text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] transition-colors"
        >
          다른 이메일로 구독하기
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--brand-border)] bg-[var(--brand-bg)] p-6 space-y-5",
        className,
      )}
    >
      {/* 이메일 입력 */}
      <div className="space-y-1.5">
        <label
          htmlFor="subscribe-email"
          className="block text-sm font-medium text-[var(--brand-text)]"
        >
          이메일 주소
          <span className="text-[var(--brand-accent-warm)] ml-0.5" aria-hidden="true">
            *
          </span>
        </label>
        <input
          id="subscribe-email"
          type="email"
          autoComplete="email"
          placeholder="example@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "subscribe-email-error" : undefined}
          {...register("email")}
          className={cn(
            "block w-full rounded-[var(--radius-input)] border px-3 py-2.5 text-sm text-[var(--brand-text)] bg-white placeholder:text-[var(--brand-text-secondary)]/50 outline-none transition-colors",
            "focus:border-[var(--brand-accent)] focus:ring-2 focus:ring-[var(--brand-accent)]/20",
            errors.email
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : "border-[var(--brand-border)]",
          )}
        />
        {errors.email && (
          <p id="subscribe-email-error" role="alert" className="text-xs text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 동의 항목 — 개인정보보호법상 필수/선택 분리 */}
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-[var(--brand-text)] mb-2">
          개인정보 동의
        </legend>

        {/* 필수: 개인정보 수집·이용 동의 */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              aria-invalid={!!errors.consentRequired}
              aria-describedby={
                errors.consentRequired ? "consent-required-error" : undefined
              }
              {...register("consentRequired")}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--brand-border)] accent-[var(--brand-accent)] cursor-pointer"
            />
            <span className="text-sm text-[var(--brand-text)] leading-snug">
              <span className="font-semibold text-[var(--brand-accent-warm)]">[필수]</span>{" "}
              개인정보 수집·이용에 동의합니다.{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-[var(--brand-text-secondary)] hover:text-[var(--brand-text)] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                개인정보처리방침
              </a>
            </span>
          </label>
          {errors.consentRequired && (
            <p
              id="consent-required-error"
              role="alert"
              className="mt-1 ml-6 text-xs text-red-500"
            >
              {errors.consentRequired.message}
            </p>
          )}
          <p className="mt-1 ml-6 text-xs text-[var(--brand-text-secondary)]">
            수집 항목: 이메일 주소 / 목적: 뉴스레터 발송 / 보유 기간: 구독 취소 시까지
          </p>
        </div>

        {/* 선택: 광고성 정보 수신 동의 (표시광고법) */}
        {showMarketingConsent && (
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                {...register("consentMarketing")}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--brand-border)] accent-[var(--brand-accent)] cursor-pointer"
              />
              <span className="text-sm text-[var(--brand-text)] leading-snug">
                <span className="font-medium text-[var(--brand-text-secondary)]">[선택]</span>{" "}
                광고성 정보 수신에 동의합니다.
              </span>
            </label>
            <p className="mt-1 ml-6 text-xs text-[var(--brand-text-secondary)]">
              펫지기의 할인·이벤트 정보를 받아볼 수 있습니다. 동의하지 않아도 구독 가능합니다.
            </p>
          </div>
        )}

        {/* 14세 이상 확인 (개인정보보호법 제22조) */}
        <div>
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              aria-invalid={!!errors.ageConfirmed}
              aria-describedby={
                errors.ageConfirmed ? "age-confirmed-error" : undefined
              }
              {...register("ageConfirmed")}
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-[var(--brand-border)] accent-[var(--brand-accent)] cursor-pointer"
            />
            <span className="text-sm text-[var(--brand-text)] leading-snug">
              <span className="font-semibold text-[var(--brand-accent-warm)]">[필수]</span>{" "}
              만 14세 이상임을 확인합니다.
            </span>
          </label>
          {errors.ageConfirmed && (
            <p
              id="age-confirmed-error"
              role="alert"
              className="mt-1 ml-6 text-xs text-red-500"
            >
              {errors.ageConfirmed.message}
            </p>
          )}
        </div>
      </fieldset>

      {/* 서버 오류 메시지 */}
      {status === "error" && serverMessage && (
        <p role="alert" className="text-sm text-red-500 text-center">
          {serverMessage}
        </p>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "w-full rounded-[var(--radius-button)] px-4 py-3 text-sm font-semibold transition-all",
          "bg-[var(--brand-accent)] text-white hover:bg-[var(--brand-accent)]/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)]/50",
          "disabled:opacity-60 disabled:cursor-not-allowed",
        )}
      >
        {status === "loading" ? "처리 중…" : "무료 PDF 받기"}
      </button>

      <p className="text-[10px] text-center text-[var(--brand-text-secondary)]">
        언제든지 수신 거부할 수 있습니다.
      </p>
    </form>
  );
}
