import Modal from "./modal.tsx";
import EnquiryForm from "./enquiry-form.tsx";
import { FORM_CONFIGS } from "../lib/forms.ts";
import type { EnquiryKind } from "../lib/forms.ts";

type Props = { kind: EnquiryKind; open: boolean; onClose: () => void; defaults?: Record<string, string> };

// The form lives inside the modal, so it resets every time the modal is reopened.
export default function EnquiryModal({ kind, open, onClose, defaults }: Props) {
  return (
    <Modal open={open} onClose={onClose} label={FORM_CONFIGS[kind].title}>
      <EnquiryForm kind={kind} defaults={defaults} />
    </Modal>
  );
}
