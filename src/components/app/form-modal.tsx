"use client";

import type { FC, FormEvent, PropsWithChildren } from "react";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { CloseButton } from "@/components/base/buttons/close-button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { useLocale } from "@/providers/locale";

interface FormModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    title: string;
    description?: string;
    icon: FC<{ className?: string }>;
    onSubmit: () => void;
}

/** A modal with a header, a form body and Cancel/Save buttons. */
export const FormModal = ({ isOpen, onOpenChange, title, description, icon, onSubmit, children }: PropsWithChildren<FormModalProps>) => {
    const { t } = useLocale();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
        onOpenChange(false);
    };

    return (
        <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal className="max-w-lg">
                <Dialog aria-label={title}>
                    <form onSubmit={handleSubmit} className="flex w-full flex-col">
                        <div className="relative flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <FeaturedIcon icon={icon} color="brand" theme="light" size="lg" />
                            <CloseButton onPress={() => onOpenChange(false)} className="absolute top-3 right-3" />
                            <div className="flex flex-col gap-1">
                                <h2 className="text-md font-semibold text-primary">{title}</h2>
                                {description && <p className="text-sm text-tertiary">{description}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 px-4 py-5 sm:px-6">{children}</div>

                        <div className="flex flex-col-reverse gap-3 border-t border-secondary px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
                            <Button color="secondary" size="lg" onPress={() => onOpenChange(false)}>
                                {t("common.cancel")}
                            </Button>
                            <Button type="submit" size="lg">
                                {t("common.save")}
                            </Button>
                        </div>
                    </form>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
};
