"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { createLead, type CreateLeadResult } from "@/app/masterclass/actions";
import {
  getStoredAttribution,
  parseAttributionFromSearch,
  storeAttributionIfNeeded,
} from "@/lib/attribution";
import type { AttributionInput, CreateLeadInput } from "@/lib/lead-schema";

import { RadioGroupField } from "@/components/form/fields/radio-group-field";
import { TextField } from "@/components/form/fields/text-field";
import { TextareaField } from "@/components/form/fields/textarea-field";

const initialState: CreateLeadResult = { ok: false, fieldErrors: {} };

function formatWhatsapp(rawValue: string): string {
  const digits = rawValue.replace(/\D/g, "").slice(0, 11);

  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (rest.length <= 4) return `(${ddd}) ${rest}`;

  const splitAt = digits.length > 10 ? 5 : 4;
  const prefix = rest.slice(0, splitAt);
  const suffix = rest.slice(splitAt);

  return `(${ddd}) ${prefix}-${suffix}`;
}

function readString(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function readOptionalString(formData: FormData, key: string): string | undefined {
  const value = readString(formData, key).trim();
  return value.length > 0 ? value : undefined;
}

function readAttribution(formData: FormData): AttributionInput {
  const raw = readOptionalString(formData, "attributionJson");
  if (!raw) return {};

  try {
    return JSON.parse(raw) as AttributionInput;
  } catch {
    return {};
  }
}

async function submitLead(
  _prevState: CreateLeadResult,
  formData: FormData,
): Promise<CreateLeadResult> {
  const attribution = readAttribution(formData);

  const input: CreateLeadInput = {
    ...attribution,
    fullName: readString(formData, "fullName"),
    whatsapp: readString(formData, "whatsapp"),
    email: readString(formData, "email"),
    cityState: readString(formData, "cityState"),
    profession: readString(formData, "profession") as CreateLeadInput["profession"],
    professionOther: readOptionalString(formData, "professionOther"),
    cro: readOptionalString(formData, "cro"),
    phase: readString(formData, "phase") as CreateLeadInput["phase"],
    goal: readString(formData, "goal"),
    intent: readString(formData, "intent") as CreateLeadInput["intent"],
    source: readString(formData, "source") as CreateLeadInput["source"],
    sourceOther: readOptionalString(formData, "sourceOther"),
    whatsappConsent: readString(formData, "whatsappConsent") === "true",
    mainDifficulty: readString(formData, "mainDifficulty"),
    honeypot: readOptionalString(formData, "honeypot"),
  };

  return createLead(input);
}

export function InterestForm() {
  const [state, formAction, isPending] = useActionState(submitLead, initialState);

  // Todos os campos são controlados (mesmo os que não precisam de máscara/lógica
  // condicional) porque o React reseta campos NÃO controlados de um <form> sempre
  // que a Server Action termina sem lançar erro — inclusive em caso de falha de
  // validação. Sem isso, um erro em um campo limpava o formulário inteiro.
  const [fullName, setFullName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [cityState, setCityState] = useState("");
  const [profession, setProfession] = useState("");
  const [professionOther, setProfessionOther] = useState("");
  const [cro, setCro] = useState("");
  const [goal, setGoal] = useState("");
  const [source, setSource] = useState("");
  const [sourceOther, setSourceOther] = useState("");
  const [mainDifficulty, setMainDifficulty] = useState("");
  const attributionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const parsed = parseAttributionFromSearch(window.location.search);
    storeAttributionIfNeeded(parsed);

    // Input não-controlado: evita re-render e mismatch de hidratação, já que
    // a atribuição só existe no client (sessionStorage/window.location).
    if (attributionInputRef.current) {
      attributionInputRef.current.value = JSON.stringify(getStoredAttribution());
    }
  }, []);

  const fieldErrors: Record<string, string[]> = state.ok ? {} : state.fieldErrors;

  return (
    <form
      action={formAction}
      className="flex w-full flex-col gap-6 rounded-2xl bg-white/60 p-5 shadow-sm ring-1 ring-brand-ink/10 sm:p-8"
    >
      <input
        type="text"
        name="honeypot"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <input
        type="hidden"
        name="attributionJson"
        ref={attributionInputRef}
        defaultValue="{}"
      />

      <TextField
        name="fullName"
        label="Nome completo"
        required
        placeholder="Seu nome completo"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        error={fieldErrors.fullName}
      />

      <TextField
        name="whatsapp"
        label="WhatsApp (com DDD)"
        required
        type="tel"
        inputMode="tel"
        placeholder="(11) 91234-5678"
        value={whatsapp}
        onChange={(event) => setWhatsapp(formatWhatsapp(event.target.value))}
        error={fieldErrors.whatsapp}
      />

      <TextField
        name="email"
        label="E-mail"
        type="email"
        required
        placeholder="seu@email.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        error={fieldErrors.email}
      />

      <TextField
        name="cityState"
        label="Cidade e Estado"
        required
        placeholder="Ex: São Paulo, SP"
        value={cityState}
        onChange={(event) => setCityState(event.target.value)}
        error={fieldErrors.cityState}
      />

      <RadioGroupField
        name="profession"
        label="Profissão"
        required
        options={[
          { value: "DENTIST", label: "Cirurgião-dentista" },
          { value: "DENTAL_STUDENT", label: "Acadêmico de Odontologia" },
          { value: "OTHER", label: "Outro (qual?)" },
        ]}
        onValueChange={setProfession}
        error={fieldErrors.profession}
      />

      {profession === "OTHER" && (
        <TextField
          name="professionOther"
          label="Qual sua profissão?"
          required
          placeholder="Especifique sua profissão"
          value={professionOther}
          onChange={(event) => setProfessionOther(event.target.value)}
          error={fieldErrors.professionOther}
        />
      )}

      <TextField
        name="cro"
        label="CRO (opcional, caso queira validar profissionais)"
        placeholder="Número do CRO"
        value={cro}
        onChange={(event) => setCro(event.target.value)}
        error={fieldErrors.cro}
      />

      <RadioGroupField
        name="phase"
        label="Em que fase você está?"
        required
        options={[
          { value: "NEVER_APPLIED", label: "Nunca apliquei Botox" },
          {
            value: "TOOK_COURSE_NOT_CONFIDENT",
            label: "Já fiz curso, mas não me sinto seguro(a)",
          },
          { value: "ALREADY_APPLIES", label: "Já aplico e quero aperfeiçoar" },
          {
            value: "WANT_TO_START_HARMONIZATION",
            label: "Quero começar a trabalhar com Harmonização Facial",
          },
        ]}
        error={fieldErrors.phase}
      />

      <TextareaField
        name="goal"
        label="Qual seu maior objetivo com esse curso?"
        required
        rows={3}
        placeholder="Conte um pouco sobre seu objetivo"
        value={goal}
        onChange={(event) => setGoal(event.target.value)}
        error={fieldErrors.goal}
      />

      <RadioGroupField
        name="intent"
        label="Você pretende fazer o curso:"
        required
        options={[
          { value: "AS_SOON_AS_OPEN", label: "Assim que abrir as inscrições" },
          { value: "NEXT_3_MONTHS", label: "Nos próximos 3 meses" },
          { value: "STILL_RESEARCHING", label: "Ainda estou pesquisando" },
        ]}
        error={fieldErrors.intent}
      />

      <RadioGroupField
        name="source"
        label="Como conheceu a Masterclass?"
        required
        options={[
          { value: "INSTAGRAM", label: "Instagram" },
          { value: "FACEBOOK", label: "Facebook" },
          { value: "REFERRAL", label: "Indicação" },
          { value: "WHATSAPP", label: "WhatsApp" },
          { value: "OTHER", label: "Outro" },
        ]}
        onValueChange={setSource}
        error={fieldErrors.source}
      />

      {source === "OTHER" && (
        <TextField
          name="sourceOther"
          label="Como assim? Nos conte como conheceu"
          required
          placeholder="Especifique como conheceu a Masterclass"
          value={sourceOther}
          onChange={(event) => setSourceOther(event.target.value)}
          error={fieldErrors.sourceOther}
        />
      )}

      <RadioGroupField
        name="whatsappConsent"
        label="Autoriza nosso contato pelo WhatsApp?"
        required
        options={[
          { value: "true", label: "Sim" },
          { value: "false", label: "Não" },
        ]}
        error={fieldErrors.whatsappConsent}
      />

      <TextareaField
        name="mainDifficulty"
        label="Se eu pudesse te ajudar em apenas UMA dificuldade na aplicação de Botox ou Preenchimento, qual seria?"
        required
        rows={3}
        placeholder="Descreva sua principal dificuldade"
        value={mainDifficulty}
        onChange={(event) => setMainDifficulty(event.target.value)}
        error={fieldErrors.mainDifficulty}
      />

      <button
        type="submit"
        disabled={isPending}
        className="mt-2 w-full rounded-lg bg-brand-terracotta px-6 py-3.5 font-sans text-base font-semibold text-white transition-colors hover:bg-brand-terracotta/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "Enviando..." : "Entrar na lista de prioridade"}
      </button>
    </form>
  );
}
