import React, { Dispatch, SetStateAction, useState } from "react";
import { Accordion, Caption, Headline, Text, Textarea } from "@telegram-apps/telegram-ui";

const TelegramMessagePreview: React.FC<{ content: string }> = ({ content }) => {
	return (
		<div className="bg-gray-100 border border-gray-300 p-4 rounded-lg rounded-bl-none shadow-md max-w-md mx-auto mt-4">
			<Text dangerouslySetInnerHTML={{ __html: content }}></Text>
		</div>
	);
};

const parseTelegramMarkdown = (markdown: string): string => {
	const rules = [
		{ regex: /\*(.*?)\*/g, replacement: "<strong>$1</strong>" },
		{ regex: /__(.*?)__/g, replacement: "<u>$1</u>" },
		{ regex: /_(.*?)_/g, replacement: "<i>$1</i>" },
		{ regex: /~(.*?)~/g, replacement: "<del>$1</del>" },
		{
			regex: /```([\s\S]*?)```/g,
			replacement: "<pre class='text-blue-400 p-1 rounded-md bg-gray-200'>$1</pre>",
		},
		{ regex: /`(.*?)`/g, replacement: "<code class='text-blue-400'>$1</code>" },
	];

	let parsed = markdown;
	rules.forEach(({ regex, replacement }) => {
		parsed = parsed.replace(regex, replacement);
	});

	return parsed;
};

export const MarkdownEditor = ({ setText, text }: { text: string; setText: Dispatch<SetStateAction<string>> }) => {
	const [preview, setPreview] = useState<string>("");
	const [isHelpOpen, setIsHelpOpen] = useState(false);

	const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		setText(event.target.value);
		setPreview(parseTelegramMarkdown(event.target.value));
	};

	return (
		<div className="p-4 mx-auto">
			<Headline className="mb-4 text-center">Редактор</Headline>
			<Textarea
				value={text}
				onChange={handleChange}
				placeholder="Напишите сообщение выбранным пользователям"
				className="p-0"
			/>

			<Accordion expanded={isHelpOpen} onChange={setIsHelpOpen}>
				<Accordion.Summary>Помощь</Accordion.Summary>
				<Accordion.Content>
					<div className="flex flex-col gap-1">
						<Caption>*Жирный текст*</Caption>
						<Caption>_Курсив_</Caption>
						<Caption>__Подчеркнутый__</Caption>
						<Caption>~Зачеркнутый~</Caption>
						<Caption>*_Жирный Курсив_* ~_Курсив Зачеркнутый_~ ___*Подчеркнутый Жирный Курсив*___</Caption>
						<Caption>`Копируемый Блок`</Caption>
						<Caption>``` Многострочный копируемый блок ```</Caption>
					</div>
				</Accordion.Content>
			</Accordion>

			<Headline className="mb-2">Предпросмотр:</Headline>
			<TelegramMessagePreview content={preview} />
		</div>
	);
};
