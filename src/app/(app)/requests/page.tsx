"use client";

import { useState } from "react";
import { Check, FilePlus02, Plus, XClose } from "@untitledui/icons";
import { Table, TableCard } from "@/components/application/table/table";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { FormModal } from "@/components/app/form-modal";
import { PageHeader } from "@/components/app/page-header";
import { RequestStatusBadge } from "@/components/app/status-badges";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import {
    type RequestStatus,
    type RequestType,
    type WorkRequest,
    getEmployee,
    getInitials,
    requests as initialRequests,
    requestTypes,
} from "@/data/mock-data";
import { useLocale } from "@/providers/locale";

type Filter = RequestStatus | "all";

const filters: Filter[] = ["all", "pending", "approved", "rejected"];

// The signed-in user. Replace with the real session user.
const CURRENT_USER_ID = "e2";

export default function RequestsPage() {
    const { t, l, formatDate, formatCurrency, formatNumber } = useLocale();

    const [requests, setRequests] = useState<WorkRequest[]>(initialRequests);
    const [filter, setFilter] = useState<Filter>("pending");
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [form, setForm] = useState({ type: "leave" as RequestType, detail: "", amount: "" });

    const countFor = (status: Filter) => (status === "all" ? requests.length : requests.filter((request) => request.status === status).length);

    const visible = filter === "all" ? requests : requests.filter((request) => request.status === filter);

    const setStatus = (id: string, status: RequestStatus) =>
        setRequests((current) => current.map((request) => (request.id === id ? { ...request, status } : request)));

    const formatAmount = (request: WorkRequest) => {
        switch (request.type) {
            case "leave":
                return `${formatNumber(request.amount)} ${t("common.days")}`;
            case "overtime":
                return `${formatNumber(request.amount)} ${t("requests.hours")}`;
            default:
                return formatCurrency(request.amount);
        }
    };

    const createRequest = () => {
        const detail = form.detail.trim();
        const nextNumber = Math.max(...requests.map((request) => Number(request.code.split("-")[1]))) + 1;

        setRequests((current) => [
            {
                id: `r${Date.now()}`,
                code: `REQ-${nextNumber}`,
                type: form.type,
                requesterId: CURRENT_USER_ID,
                detail: { th: detail, en: detail },
                amount: Number(form.amount) || 0,
                submittedAt: new Date().toISOString().slice(0, 10),
                status: "pending",
            },
            ...current,
        ]);
        setForm({ type: "leave", detail: "", amount: "" });
        setFilter("pending");
    };

    const amountLabel =
        form.type === "leave"
            ? `${t("requests.form.amount")} (${t("common.days")})`
            : form.type === "overtime"
              ? `${t("requests.form.amount")} (${t("requests.hours")})`
              : `${t("requests.form.amount")} (THB)`;

    return (
        <>
            <PageHeader
                title={t("requests.title")}
                description={t("requests.subtitle")}
                actions={
                    <Button size="md" iconLeading={Plus} onPress={() => setIsNewOpen(true)}>
                        {t("requests.new")}
                    </Button>
                }
            />

            <Tabs selectedKey={filter} onSelectionChange={(key) => setFilter(key as Filter)}>
                <TabList
                    type="button-border"
                    size="sm"
                    className="w-full overflow-x-auto"
                    items={filters.map((id) => ({
                        id,
                        label: id === "all" ? t("common.all") : t(`requests.status.${id}`),
                        badge: countFor(id),
                    }))}
                />
            </Tabs>

            <TableCard.Root>
                <Table aria-label={t("requests.title")}>
                    <Table.Header>
                        <Table.Head id="request" isRowHeader label={t("requests.col.request")} className="w-full" />
                        <Table.Head id="requester" label={t("requests.col.requester")} />
                        <Table.Head id="submitted" label={t("requests.col.submitted")} />
                        <Table.Head id="amount" label={t("requests.col.amount")} />
                        <Table.Head id="status" label={t("requests.col.status")} />
                        <Table.Head id="actions" label={t("requests.col.actions")} />
                    </Table.Header>
                    <Table.Body items={visible} renderEmptyState={() => <p className="py-10 text-center text-sm text-tertiary">{t("common.noResults")}</p>}>
                        {(request) => {
                            const requester = getEmployee(request.requesterId);
                            return (
                                <Table.Row id={request.id}>
                                    <Table.Cell>
                                        <div className="flex flex-col">
                                            <span className="font-medium whitespace-nowrap text-primary">
                                                {t(`requests.type.${request.type}`)} · {request.code}
                                            </span>
                                            <span className="text-tertiary">{l(request.detail)}</span>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {requester && (
                                            <AvatarLabelGroup
                                                size="sm"
                                                initials={getInitials(requester.name.en)}
                                                title={<span className="whitespace-nowrap">{l(requester.name)}</span>}
                                                subtitle={t(`dept.${requester.department}`)}
                                            />
                                        )}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{formatDate(request.submittedAt)}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{formatAmount(request)}</Table.Cell>
                                    <Table.Cell>
                                        <RequestStatusBadge status={request.status} />
                                    </Table.Cell>
                                    <Table.Cell>
                                        {request.status === "pending" && (
                                            <div className="flex gap-2">
                                                <Button size="sm" color="secondary" iconLeading={Check} onPress={() => setStatus(request.id, "approved")}>
                                                    {t("requests.approve")}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    color="tertiary-destructive"
                                                    iconLeading={XClose}
                                                    onPress={() => setStatus(request.id, "rejected")}
                                                >
                                                    {t("requests.reject")}
                                                </Button>
                                            </div>
                                        )}
                                    </Table.Cell>
                                </Table.Row>
                            );
                        }}
                    </Table.Body>
                </Table>
            </TableCard.Root>

            <FormModal
                isOpen={isNewOpen}
                onOpenChange={setIsNewOpen}
                title={t("requests.form.title")}
                description={t("requests.form.subtitle")}
                icon={FilePlus02}
                onSubmit={createRequest}
            >
                <Select
                    label={t("requests.form.type")}
                    items={requestTypes.map((id) => ({ id, label: t(`requests.type.${id}`) }))}
                    selectedKey={form.type}
                    onSelectionChange={(key) => key && setForm({ ...form, type: key as RequestType })}
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
                <TextArea
                    isRequired
                    label={t("requests.form.detail")}
                    placeholder={t("requests.form.detailPlaceholder")}
                    rows={3}
                    value={form.detail}
                    onChange={(detail) => setForm({ ...form, detail })}
                />
                <Input isRequired type="number" label={amountLabel} value={form.amount} onChange={(amount) => setForm({ ...form, amount })} />
            </FormModal>
        </>
    );
}
