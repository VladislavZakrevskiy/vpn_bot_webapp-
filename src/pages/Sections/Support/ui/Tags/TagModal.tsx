import { useGetTagsQuery } from "@/entities/Support";
import { IconButton, Modal, Spinner, Text } from "@telegram-apps/telegram-ui";
import { FC, useState } from "react";
import { FaHashtag } from "react-icons/fa";
import { CreateUpdateModal } from "./CreateUpdateModal";
import { DeleteTagModal } from "./DeleteTag";

interface DeleteModalProps {}

export const TagModal: FC<DeleteModalProps> = () => {
	const { data: tags, isLoading, refetch } = useGetTagsQuery();
	const [isOpen, setIsOpen] = useState(false);
	console.log(tags);

	return (
		<>
			<IconButton className="flex justify-center items-center" mode="bezeled" onClick={() => setIsOpen(true)}>
				<FaHashtag />
			</IconButton>

			<Modal onOpenChange={setIsOpen} open={isOpen}>
				<div className="p-3">
					{isLoading ? (
						<div className="flex justify-center items-center">
							<Spinner size="l" />
						</div>
					) : (
						<>
							<div className="flex justify-between mb-2">
								<Text>{tags?.length !== 0 ? `Тегов: ${tags?.length}` : "Тегов нет"}</Text>
								<CreateUpdateModal mode={"create"} refetch={refetch} />
							</div>
							{tags ? (
								<div className="grid grid-rows-1 gap-1">
									{tags.map((tag) => (
										<div className="flex justify-between flex-1 items-center gap-2">
											<Text>{tag.value}</Text>
											<div className="flex items-center justify-center gap-1">
												<DeleteTagModal id={tag.id} refetch={refetch} />
												<CreateUpdateModal value={tag.value} mode={"update"} id={tag.id} refetch={refetch} />
											</div>
										</div>
									))}
								</div>
							) : null}
						</>
					)}
				</div>
			</Modal>
		</>
	);
};
