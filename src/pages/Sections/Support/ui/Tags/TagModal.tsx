import { useGetTagsQuery } from "@/entities/Support";
import { Cell, IconButton, Modal, Spinner, Text } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { CreateUpdateModal } from "./CreateUpdateModal";
import { DeleteTagModal } from "./DeleteTag";

interface DeleteModalProps {}

export const TagModal: FC<DeleteModalProps> = () => {
	const { data: tags, isLoading, refetch } = useGetTagsQuery();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<IconButton className="flex justify-center items-center" mode="bezeled" onClick={() => setIsOpen(true)}>
				<FaHashtag />
			</IconButton>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				{isLoading ? (
					<div className="p-3 flex justify-center items-center">
						<Spinner size="l" />
					</div>
				) : (
					<>
						<div className="flex justify-between">
							<Text>{tags?.length !== 0 ? `Тегов: ${tags?.length}` : "Тегов нет"}</Text>
							<CreateUpdateModal mode={"create"} refetch={refetch} />
						</div>
						{tags ? (
							<div className="grid grid-rows-1 gap-1">
								{tags.map((tag) => (
									<Cell className="flex justify-between items-center gap-2">
										<Text></Text>
										<div className="flex items-center justify-center gap-1">
											<DeleteTagModal id={tag.id} refetch={refetch} />
											<CreateUpdateModal mode={"update"} id={tag.id} refetch={refetch} />
										</div>
									</Cell>
								))}
							</div>
						) : null}
					</>
				)}
			</Modal>
		</>
	);
};
