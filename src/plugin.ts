import { Board } from "@penpot/plugin-types";
import type { PluginMessageEvent } from "./model";

const CONTENT_BOARD_WIDTH = 900;

const capitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

penpot.ui.open("Planpot - Generate your plannings!", `?theme=${penpot.theme}`);

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", content: theme });
});

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message);
}

const createContentBoard = (board: Board): Board => {
  const contentBoard = penpot.createBoard();
  contentBoard.name = "Content";
  contentBoard.resize(CONTENT_BOARD_WIDTH, 1500);

  board.appendChild(contentBoard);

  const contentBoardFlex = contentBoard.addFlexLayout();
  contentBoardFlex.alignItems = "center";
  contentBoardFlex.horizontalPadding = 40;
  contentBoardFlex.verticalPadding = 40;
  if (contentBoard.flex) contentBoard.flex.dir = "column";

  return contentBoard;
};

const createDay = (board: Board, day: string) => {
  let dayText = penpot.createText(capitalizeString(day));
  if (dayText != null) {
    dayText.name = "day";
    board.appendChild(dayText);
  }
};

const createTime = (board: Board, beginHour: string, endHour: string) => {
  let timeText = penpot.createText(
    `${beginHour}${endHour !== "" ? ` - ${endHour}` : ""}`
  );
  if (timeText != null) {
    timeText.name = "time";
    
    board.appendChild(timeText);
  }
};

const createTitle = (board: Board, title: string) => {
  if (title === "") return;

  let titleText = penpot.createText(title);
  if (titleText != null) {
    titleText.name = "title";
    titleText.fontFamily = "Work Sans";
    titleText.fontSize = "50";

    titleText.resize(CONTENT_BOARD_WIDTH - 80, 100);
    titleText.growType = "auto-height";
    

    board.appendChild(titleText);
  }
};

const createDescription = (board: Board, description: string) => {
  if (description === "") return;

  let descriptionText = penpot.createText(description);
  if (descriptionText != null) {
    descriptionText.name = "description";
    descriptionText.fontFamily = "Work Sans";
    descriptionText.fontSize = "30";
    board.appendChild(descriptionText);
  }
};

const createImage = (board: Board, images: FileList) => {
  if (images.length <= 0) return;

  images[0].arrayBuffer().then(async (buff: ArrayBufferLike) => {
    let x = new Uint8Array(buff);

    const imageData = await penpot.uploadMediaData(
      images[0].name,
      x,
      images[0].type
    );
    console.log(imageData);

    const shape = penpot.createRectangle();
    shape.fills = [{ fillOpacity: 1, fillImage: imageData }];

    board.appendChild(shape);
  });
};

penpot.ui.onMessage<{
  type: string;
  data: any;
  days: { [key: string]: boolean };
}>((message) => {
  console.log(message);

  if (message.type === "planpot-generate") {
    if (message.data.instaStory) {
      let boardCoords = { x: 0, y: 0 };

      Promise.all(
        Object.keys(message.days).map(async (day) => {
          if (message.days[day]) {
            const board = penpot.createBoard();
            board.name = `${day} - Story Insta`;
            board.resize(1080, 1920);

            board.x = boardCoords.x;
            board.y = boardCoords.y;
            boardCoords = { x: boardCoords.x + 1080 + 40, y: boardCoords.y };

            const boardFlex = board.addFlexLayout();
            boardFlex.alignItems = "center";
            boardFlex.justifyContent = "center";

            // CONTENT BOARD
            const contentBoard = createContentBoard(board);

            // DAY TEXT
            createDay(contentBoard, day);

            // TIME TEXT
            createTime(
              contentBoard,
              message.data[`${day}BeginHour`],
              message.data[`${day}EndHour`]
            );

            // TITLE TEXT
            createTitle(contentBoard, message.data[`${day}Title`]);

            // DESCRIPTION TEXT
            createDescription(contentBoard, message.data[`${day}Description`]);

            // IMAGE
            createImage(contentBoard, message.data[`${day}Image`]);
          }
        })
      );
    }
  }
});
