"use client";

import { useMemo, useState } from "react";
import { Plus, SearchLg, UserPlus01 } from "@untitledui/icons";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Table, TableCard } from "@/components/application/table/table";
import { FormModal } from "@/components/app/form-modal";
import { PageHeader } from "@/components/app/page-header";
import { EmployeeStatusBadge } from "@/components/app/status-badges";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { type Department, type Employee, departments, employees as initialEmployees, getInitials } from "@/data/mock-data";
import { useLocale } from "@/providers/locale";

const ALL = "all";

export default function EmployeesPage() {
    const { t, l, formatDate } = useLocale();

    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState<Department | typeof ALL>(ALL);
    const [isAddOpen, setIsAddOpen] = useState(false);

    const [form, setForm] = useState({ name: "", email: "", position: "", department: "engineering" as Department });

    const departmentItems = [{ id: ALL, label: t("employees.allDepartments") }, ...departments.map((id) => ({ id, label: t(`dept.${id}`) }))];

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        return employees.filter((employee) => {
            if (department !== ALL && employee.department !== department) return false;
            if (!query) return true;
            return [employee.name.th, employee.name.en, employee.email].some((value) => value.toLowerCase().includes(query));
        });
    }, [employees, search, department]);

    const addEmployee = () => {
        const name = form.name.trim();
        const position = form.position.trim();

        setEmployees((current) => [
            {
                id: `e${Date.now()}`,
                name: { th: name, en: name },
                email: form.email.trim(),
                position: { th: position, en: position },
                department: form.department,
                status: "probation",
                joinedAt: new Date().toISOString().slice(0, 10),
            },
            ...current,
        ]);
        setForm({ name: "", email: "", position: "", department: "engineering" });
    };

    return (
        <>
            <PageHeader
                title={t("employees.title")}
                description={t("employees.subtitle")}
                actions={
                    <Button size="md" iconLeading={Plus} onPress={() => setIsAddOpen(true)}>
                        {t("employees.add")}
                    </Button>
                }
            />

            <TableCard.Root>
                <TableCard.Header
                    title={t("employees.title")}
                    badge={String(filtered.length)}
                    contentTrailing={
                        <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
                            <Input
                                size="sm"
                                icon={SearchLg}
                                aria-label={t("common.search")}
                                placeholder={t("employees.searchPlaceholder")}
                                value={search}
                                onChange={setSearch}
                                className="sm:w-64"
                            />
                            <Select
                                size="sm"
                                aria-label={t("employees.department")}
                                items={departmentItems}
                                selectedKey={department}
                                onSelectionChange={(key) => setDepartment((key ?? ALL) as Department | typeof ALL)}
                                className="sm:w-48"
                            >
                                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                            </Select>
                        </div>
                    }
                />

                {filtered.length === 0 ? (
                    <div className="py-12">
                        <EmptyState size="sm">
                            <EmptyState.Header pattern="none">
                                <EmptyState.FeaturedIcon color="gray" />
                            </EmptyState.Header>
                            <EmptyState.Content>
                                <EmptyState.Title>{t("common.noResults")}</EmptyState.Title>
                                <EmptyState.Description>{t("common.noResultsHint")}</EmptyState.Description>
                            </EmptyState.Content>
                        </EmptyState>
                    </div>
                ) : (
                    <Table aria-label={t("employees.title")}>
                        <Table.Header>
                            <Table.Head id="name" isRowHeader label={t("employees.col.name")} className="w-full max-w-1/3" />
                            <Table.Head id="position" label={t("employees.col.position")} />
                            <Table.Head id="department" label={t("employees.col.department")} />
                            <Table.Head id="status" label={t("employees.col.status")} />
                            <Table.Head id="joined" label={t("employees.col.joined")} />
                        </Table.Header>
                        <Table.Body items={filtered}>
                            {(employee) => (
                                <Table.Row id={employee.id}>
                                    <Table.Cell>
                                        <AvatarLabelGroup
                                            size="md"
                                            initials={getInitials(employee.name.en)}
                                            title={l(employee.name)}
                                            subtitle={employee.email}
                                        />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{l(employee.position)}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{t(`dept.${employee.department}`)}</Table.Cell>
                                    <Table.Cell>
                                        <EmployeeStatusBadge status={employee.status} />
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{formatDate(employee.joinedAt)}</Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table>
                )}
            </TableCard.Root>

            <FormModal
                isOpen={isAddOpen}
                onOpenChange={setIsAddOpen}
                title={t("employees.form.title")}
                description={t("employees.form.subtitle")}
                icon={UserPlus01}
                onSubmit={addEmployee}
            >
                <Input isRequired label={t("employees.form.name")} value={form.name} onChange={(name) => setForm({ ...form, name })} />
                <Input isRequired type="email" label={t("employees.form.email")} value={form.email} onChange={(email) => setForm({ ...form, email })} />
                <Input isRequired label={t("employees.form.position")} value={form.position} onChange={(position) => setForm({ ...form, position })} />
                <Select
                    label={t("employees.department")}
                    items={departments.map((id) => ({ id, label: t(`dept.${id}`) }))}
                    selectedKey={form.department}
                    onSelectionChange={(key) => key && setForm({ ...form, department: key as Department })}
                >
                    {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                </Select>
            </FormModal>
        </>
    );
}
