# MỤC LỤC — Khóa LangGraph: Develop LLM powered AI agents (Eden Marco)

> Index các bài blog đã biên soạn từ transcript khóa **LangGraph — Develop LLM powered AI agents with LangGraph** (Udemy, giảng viên Eden Marco).
> Cấu trúc section theo HTML gốc. Số bài theo transcript UA (thư mục `transcripts-ua/langgraph`).
> Style biên soạn: xem `_STYLE - Blog style guide.md`. Mỗi bài là một file blog tiếng Việt trong thư mục section tương ứng.

**Tổng: 12 section · 70 bài blog**

---

## 01. Introduction

- [001 - Intro](<01. Introduction/001 - Intro.md>) — 🚀 Chào mừng đến với LangGraph: Xây dựng AI Agent tùy biến bằng flow engineering
- [002 - Prerequisites](<01. Introduction/002 - Prerequisites.md>) — 🎯 Yêu cầu đầu vào (Prerequisites): Hãy xem bài này trước khi đăng ký!
- [003 - Course Community](<01. Introduction/003 - Course Community.md>) — 💬 Cộng đồng khóa học: Discord server — nơi mọi câu hỏi đều được chào đón
- [004 - What is LangGraph](<01. Introduction/004 - What is LangGraph.md>) — 🔍 LangGraph là gì và vì sao nó khác biệt với LangChain? (Câu chuyện về những vòng lặp)
- [005 - Why LangGraph and AI Agents](<01. Introduction/005 - Why LangGraph and AI Agents.md>) — 🤖 Vì sao LangGraph ra đời? Hành trình đi tìm sự cân bằng giữa tự do và đáng tin cậy
- [006 - What are Graphs](<01. Introduction/006 - What are Graphs.md>) — 🧮 Graph và State Machine là gì? Hai khái niệm bạn sẽ dùng suốt khóa học
- [007 - Flow Engineering](<01. Introduction/007 - Flow Engineering.md>) — 🗺️ Flow Engineering là gì? Tương lai của việc phát triển phần mềm AI
- [008 - LangGraph Core Components](<01. Introduction/008 - LangGraph Core Components.md>) — 🧩 Các thành phần cốt lõi của LangGraph: Nodes, Edges và State (Hiểu trước khi code!)

## 02. Reflection Agent

- [009 - What Are We Building](<02. Reflection Agent/009 - What Are We Building.md>) — 🪞 Reflection Agent: Dự án đầu tiên giúp AI tự "soi gương" và viết lại Tweet của bạn
- [010 - Project Setup](<02. Reflection Agent/010 - Project Setup.md>) — 🛠️ Project Setup: Dựng môi trường cho Reflection Agent từ con số 0
- [011 - Creating the Reflector and Revisor Chains](<02. Reflection Agent/011 - Creating the Reflector and Revisor Chains.md>) — 🧠 Reflector & Revisor: Xây hai "bộ não" chạy bên trong Reflection Agent
- [012 - Defining our LangGraph Graph](<02. Reflection Agent/012 - Defining our LangGraph Graph.md>) — 🕸️ Định nghĩa LangGraph Graph: Node, Conditional Edge và lần đầu "vẽ" graph
- [013 - Defining our LangGraph Graph (Refilmed)](<02. Reflection Agent/013 - Defining our LangGraph Graph (Refilmed).md>) — 🧩 Định nghĩa Graph theo chuẩn LangGraph 1.0: State, Reducer và Typed State
- [014 - LangSmith Tracing](<02. Reflection Agent/014 - LangSmith Tracing.md>) — 🔍 LangSmith Tracing: Chạy thử Reflection Agent và xem lại toàn bộ "hành trình" của LLM
- [015 - Personal Message](<02. Reflection Agent/015 - Personal Message.md>) — 💛 Lời nhắn cá nhân từ Eden: Một đánh giá nhỏ, một động lực rất lớn

## 03. Reflexion Agent

- [016 - What Are We Building](<03. Reflexion Agent/016 - What Are We Building.md>) — 🧠 Reflexion Agent có "vũ khí": Xây dựng AI Agent biết tự tra cứu web và tự phê bình
- [017 - Project Setup](<03. Reflexion Agent/017 - Project Setup.md>) — ⚙️ Project Setup cho Reflexion Agent: Dựng môi trường "chuẩn bài" chỉ trong vài phút
- [018 - Actor Agent](<03. Reflexion Agent/018 - Actor Agent.md>) — 🎭 Actor Agent: "First responder chain" viết bản nháp đầu tiên kèm critique và search query
- [019 - Revisor Agent](<03. Reflexion Agent/019 - Revisor Agent.md>) — 🔁 Revisor Agent: Vòng lặp "duyệt – sửa" nâng cấp bài viết qua từng vòng
- [020 - ToolNode Executing Tools](<03. Reflexion Agent/020 - ToolNode Executing Tools.md>) — 🔧 ToolNode: "Cỗ máy" thực thi tool giúp bạn tiết kiệm hàng tấn công việc
- [021 - Tool Executor Agent Part A](<03. Reflexion Agent/021 - Tool Executor Agent Part A.md>) — 🕰️ Tool Executor thời "tiền ToolNode" (Phần A): Tự tay viết execute_tools
- [022 - Tool Executor Agent Part B](<03. Reflexion Agent/022 - Tool Executor Agent Part B.md>) — ⚡ Tool Executor thời "tiền ToolNode" (Phần B): Parse tool calls và chạy Tavily song song
- [023 - Tool Executor Agent Part C](<03. Reflexion Agent/023 - Tool Executor Agent Part C.md>) — 🧰 Tool Executor Agent (Phần C): "Đóng gói" kết quả Tavily thành ToolMessage
- [024 - Building Our LangGraph Graph](<03. Reflexion Agent/024 - Building Our LangGraph Graph.md>) — 🕸️ Building Our LangGraph Graph: Ghép mọi mảnh ghép thành Reflexion Agent hoàn chỉnh
- [025 - Tracing Our Graph](<03. Reflexion Agent/025 - Tracing Our Graph.md>) — 🔍 Tracing Graph với LangSmith: Mổ xẻ từng bước chạy của Reflexion Agent

## 04. Agentic RAG Flows

- [026 - Agentic RAG Architecture](<04. Agentic RAG Flows/026 - Agentic RAG Architecture.md>) — 🧩 Kiến trúc Agentic RAG: Chúng ta sẽ xây dựng gì trong chương này?
- [027 - Corrective RAG Flow](<04. Agentic RAG Flows/027 - Corrective RAG Flow.md>) — 🔍 Corrective RAG (RAG tự sửa): Nâng tầm chất lượng câu trả lời khi truy xuất tài liệu
- [028 - Project Boilerplate Setup](<04. Agentic RAG Flows/028 - Project Boilerplate Setup.md>) — ⚙️ Khởi tạo dự án Agentic RAG với LangGraph: Poetry, PyCharm và bản cập nhật mới nhất
- [029 - Code Structure](<04. Agentic RAG Flows/029 - Code Structure.md>) — 🗂️ Cấu trúc code "chuẩn production": Để repository phản ánh đúng kiến trúc graph
- [030 - Vector Store Ingestion Pipeline](<04. Agentic RAG Flows/030 - Vector Store Ingestion Pipeline.md>) — 📥 Ingestion Pipeline: Nạp tài liệu vào ChromaDB với UnstructuredLoader
- [031 - The GraphState](<04. Agentic RAG Flows/031 - The GraphState.md>) — 🧠 GraphState: "Bộ nhớ" chảy xuyên suốt các node trong LangGraph
- [032 - The Retrieve Node](<04. Agentic RAG Flows/032 - The Retrieve Node.md>) — 🔎 Retrieve Node: Lấy ngữ cảnh liên quan từ vector store cho LLM
- [033 - Building a Relevance Filter for RAG](<04. Agentic RAG Flows/033 - Building a Relevance Filter for RAG.md>) — 🔍 Bộ lọc Độ liên quan cho RAG: Dạy LLM "chấm điểm" tài liệu trước khi trả lời (Đừng bỏ qua nhé!)
- [034 - Web Search Node with Tavily](<04. Agentic RAG Flows/034 - Web Search Node with Tavily.md>) — 🌐 Web Search Node với Tavily: "Pha cứu cánh" khi Vector Store bó tay
- [035 - LLM Generation Chain and Node](<04. Agentic RAG Flows/035 - LLM Generation Chain and Node.md>) — ✍️ Generation Node: Nơi LLM "nấu chín" câu trả lời cuối cùng
- [036 - Building the Complete LangGraph Agent](<04. Agentic RAG Flows/036 - Building the Complete LangGraph Agent.md>) — 🧩 Lắp ráp Graph hoàn chỉnh: Khoảnh khắc mọi mảnh ghép "về chung một nhà"
- [037 - Self-RAG Introduction](<04. Agentic RAG Flows/037 - Self-RAG Introduction.md>) — 🪞 Self-RAG: Dạy AI "tự soi gương" trước khi trả lời (Ý tưởng cực hay!)
- [038 - Self-RAG Implementation](<04. Agentic RAG Flows/038 - Self-RAG Implementation.md>) — 🛠️ Triển khai Self-RAG từ A đến Z: Hallucination Grader & Answer Grader (Bài thực hành dài)
- [039 - Adaptive-RAG Implementation](<04. Agentic RAG Flows/039 - Adaptive-RAG Implementation.md>) — 🧭 Adaptive RAG: Bộ định tuyến câu hỏi thông minh (Vector Store hay Web Search?)

## 05. Implementing ReAct AgentExecutor with LangGraph

- [040 - What We Are Building](<05. Implementing ReAct AgentExecutor with LangGraph/040 - What We Are Building.md>) — 🎯 Chúng ta sẽ xây dựng gì? ReAct AgentExecutor trên LangGraph (Dự án "Hello World" của Agent)
- [041 - Project Environment Setup](<05. Implementing ReAct AgentExecutor with LangGraph/041 - Project Environment Setup.md>) — ⚙️ Get Started: Dựng môi trường cho dự án ReAct Agent (Poetry, API keys & cấu trúc thư mục)
- [042 - The ReAct Runnable](<05. Implementing ReAct AgentExecutor with LangGraph/042 - The ReAct Runnable.md>) — 🧠 Lập trình "bộ não" của Agent: Hiện thực ReAct Runnable với Function Calling
- [043 - Defining the Agent Nodes](<05. Implementing ReAct AgentExecutor with LangGraph/043 - Defining the Agent Nodes.md>) — 🧱 Building Blocks: Định nghĩa các Node của Agent trong LangGraph (Reasoning Node & ToolNode)
- [044 - Connecting Nodes into a Graph](<05. Implementing ReAct AgentExecutor with LangGraph/044 - Connecting Nodes into a Graph.md>) — 🕸️ Bringing Your ReAct Agent to Life: Nối các Node thành Graph hoàn chỉnh
- [045 - Running the ReAct Agent](<05. Implementing ReAct AgentExecutor with LangGraph/045 - Running the ReAct Agent.md>) — 🏃 Chạy thử ReAct Agent trên LangGraph: Nhìn tận mắt từng Tool Call trong LangSmith

## 06. Persistence

- [046 - Persistence in LangGraph](<06. Persistence/046 - Persistence in LangGraph.md>) — 🧩 Persistence trong LangGraph: Khi AI Agent biết "nhớ" và chạy tiếp đúng chỗ
- [047 - MemorySaver Interrupts](<06. Persistence/047 - MemorySaver Interrupts.md>) — ⏸️ Dừng đúng lúc, chạy tiếp đúng chỗ: MemorySaver + Interrupts cho Human-in-the-loop
- [048 - MemorySaver](<06. Persistence/048 - MemorySaver.md>) — 🧵 MemorySaver thực chiến: Thread, Interrupt và cách "chèn" phản hồi con người vào state
- [049 - SqliteSaver](<06. Persistence/049 - SqliteSaver.md>) — 💾 SqliteSaver: Nâng cấp bộ nhớ tạm thành state "bám trụ" trên đĩa

## 07. Run graph asynchronously

- [050 - Implementing Async Execution](<07. Run graph asynchronously/050 - Implementing Async Execution.md>) — ⚡ Chạy bất đồng bộ trong LangGraph: Fan-out/Fan-in "có sẵn" mà không cần asyncio hay multithreading
- [051 - Parallel Fan-Out and Fan-In with Extra Steps](<07. Run graph asynchronously/051 - Parallel Fan-Out and Fan-In with Extra Steps.md>) — 🧩 Fan-out/Fan-in nâng cao: Thêm bước phụ sau node B mà vẫn chạy song song
- [052 - Conditional Branching with Async Execution](<07. Run graph asynchronously/052 - Conditional Branching with Async Execution.md>) — 🔀 Conditional branching với async: Rẽ nhánh theo điều kiện mà các node vẫn chạy song song
- [053 - Async Nodes Benefits vs Challenges](<07. Run graph asynchronously/053 - Async Nodes Benefits vs Challenges.md>) — ⚖️ Async Nodes: Lợi ích và thách thức — Bí kíp giữ state "sạch" khi chạy song song

## 08. LangGraph Ecosystem- LangGraph Studio Cloud API Cloud

- [054 - Section Introduction](<08. LangGraph Ecosystem- LangGraph Studio Cloud API Cloud/054 - Section Introduction.md>) — 🧭 Khám phá Hệ sinh thái LangGraph: Studio, Cloud API và Cloud — Bộ ba giúp debug & triển khai agent
- [055 - LangGraph Studio](<08. LangGraph Ecosystem- LangGraph Studio Cloud API Cloud/055 - LangGraph Studio.md>) — 🎨 LangGraph Studio: "IDE" giúp bạn nhìn thấy agent đang chạy và debug nhanh gấp nhiều lần
- [056 - Cloud API Local Setup](<08. LangGraph Ecosystem- LangGraph Studio Cloud API Cloud/056 - Cloud API Local Setup.md>) — 🚀 Chạy LangGraph Cloud API trên máy bạn: Từ langgraph.json đến web server "tự sinh"
- [057 - Cloud API Deep Dive](<08. LangGraph Ecosystem- LangGraph Studio Cloud API Cloud/057 - Cloud API Deep Dive.md>) — 🧩 LangGraph Cloud API Deep Dive: Assistants, Threads và Runs — bộ ba "linh hồn" của mọi ứng dụng LLM
- [058 - Deploying to LangGraph Cloud](<08. LangGraph Ecosystem- LangGraph Studio Cloud API Cloud/058 - Deploying to LangGraph Cloud.md>) — ☁️ Deploy lên LangGraph Cloud: Đưa agent "lên mây" chỉ với vài cú click

## 09. Production featuring GPT-Researcher

- [059 - Agents in Production](<09. Production featuring GPT-Researcher/059 - Agents in Production.md>) — 🏭 Đưa Agent lên Production: Những thách thức thật sự và lời khuyên "tỉnh táo" từ mình
- [060 - LangGraph vs CrewAI](<09. Production featuring GPT-Researcher/060 - LangGraph vs CrewAI.md>) — 🥊 LangGraph vs CrewAI: Đâu là framework cho multi-agent "chạy được" thật sự?
- [061 - GPT Researcher](<09. Production featuring GPT-Researcher/061 - GPT Researcher.md>) — 🔬 GPT Researcher: Cỗ máy nghiên cứu tự động đạt chuẩn production (Demo thực chiến)
- [062 - GPT Researcher Setup](<09. Production featuring GPT-Researcher/062 - GPT Researcher Setup.md>) — 🛠️ Cài đặt GPT Researcher: Từ clone repo đến chạy UI trong vài bước
- [063 - GPT Researcher Architecture](<09. Production featuring GPT-Researcher/063 - GPT Researcher Architecture.md>) — 🧠 Kiến trúc GPT Researcher: "Mổ xẻ" bộ não của cỗ máy nghiên cứu tự động
- [064 - Multi-Agent Architecture](<09. Production featuring GPT-Researcher/064 - Multi-Agent Architecture.md>) — 🕸️ Multi-Agent Architecture: Biến GPT Researcher thành một node trong LangGraph
- [065 - Deep Research with Assaf Elovic](<09. Production featuring GPT-Researcher/065 - Deep Research with Assaf Elovic.md>) — 🎙️ Deep Research cùng Assaf Elovic: Tương lai của research agent, Human-in-the-Loop và bài học từ GPT Researcher

## 10. Production Featuring CopilotKit

- [066 - Generative UI](<10. Production Featuring CopilotKit/066 - Generative UI.md>) — 🎨 Generative UI: Khi giao diện trở thành "cầu nối niềm tin" giữa người dùng và AI
- [067 - Human in the Loop](<10. Production Featuring CopilotKit/067 - Human in the Loop.md>) — 🔁 Human-in-the-Loop với CopilotKit: Hai kiểu can thiệp, vô vàn cách triển khai (Đừng bỏ qua!)
- [068 - Agent Human Interaction Part 1](<10. Production Featuring CopilotKit/068 - Agent Human Interaction Part 1.md>) — 💬 Tương tác Người — Agent năm 2025: Chat đã đưa chúng ta đến đâu, và bước tiếp theo là gì?
- [069 - Agent Human Interaction Part 2](<10. Production Featuring CopilotKit/069 - Agent Human Interaction Part 2.md>) — 🧠 Khi state "biết nói": Generative UI động, transparency và bài toán niềm tin với agent

## 11. Troubleshooting Section

- [070 - Technical Issue Watch This First](<11. Troubleshooting Section/070 - Technical Issue Watch This First.md>) — 🆘 Gặp lỗi kỹ thuật? Xem ngay bài này trước khi tự "vật lộn" hàng giờ!

## 12. Bonus

> Section này không có bài transcript trong bộ sưu tập (chỉ có mục lục trên Udemy).
