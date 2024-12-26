import { useGetUsersQuery } from "@/entities/User";
import { Button, Multiselect } from "@telegram-apps/telegram-ui";
import { MultiselectOption } from "@telegram-apps/telegram-ui/dist/components/Form/Multiselect/types";
import { useEffect, useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { useSendMailingMutation } from "@/entities/Mailing";

const MailingPage = () => {
	const { isLoading, data: users } = useGetUsersQuery();
	const [selectedUsers, setSelectedUsers] = useState<MultiselectOption[]>([]);
	const [options, setOptions] = useState<MultiselectOption[]>([]);
	const [sendMailing, { isLoading: isSendLoading }] = useSendMailingMutation();
	const [text, setText] = useState<string>("");

	useEffect(() => {
		if (!isLoading && users) {
			setOptions(users.map(({ id, vpn: { name } }) => ({ label: name, value: id })));
		}
	}, [users, isLoading]);

	const onSubmit = async () => {
		try {
			await sendMailing({ msg: text, ids: selectedUsers.map(({ value }) => value.toString()) });
			setText("");
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (users) {
			if (selectedUsers.length === 0) {
				setOptions(users.map(({ id, vpn: { name } }) => ({ label: name, value: id })) || []);
			}
			for (const selectedUser of selectedUsers) {
				if (selectedUser.value === "all_users") {
					setSelectedUsers([{ label: "Всем пользователям", value: "all_users" }]);
					setOptions([]);
				} else {
					setOptions(users?.map(({ id, vpn: { name } }) => ({ label: name, value: id })) || []);
				}
			}
		}
	}, [selectedUsers, users]);

	return (
		<div>
			<Multiselect
				status="focused"
				header="Получатели"
				options={users ? [{ label: "Всем пользователям", value: "all_users" }, ...options] : []}
				value={selectedUsers}
				onChange={(e) => setSelectedUsers(e)}
				selectedBehavior="hide"
				filterFn={(input, user) => user.value.toString().includes(input)}
			/>
			<MarkdownEditor setText={setText} text={text} />
			<div className="p-3">
				<Button loading={isSendLoading} onClick={onSubmit} stretched>
					Отправить
				</Button>
			</div>
		</div>
	);
};

export default MailingPage;
