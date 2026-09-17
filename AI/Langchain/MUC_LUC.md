# MỤC LỤC — Khóa LangChain: Agentic AI Engineering (Eden Marco)

> Index các bài blog đã biên soạn từ transcript khóa **LangChain — Agentic AI Engineering with LangChain & LangGraph** (Udemy, giảng viên Eden Marco).
> Cấu trúc section theo HTML gốc (snapshot 15/07/2026). Số bài theo transcript UA (thư mục `transcripts-ua/langchain`).
> Style biên soạn: xem `_STYLE - Blog style guide.md`. Mỗi bài là một file blog tiếng Việt trong thư mục section tương ứng.

**Tổng: 30 section · 173 bài blog**

---

## 01. Introduction

- [001 - Course Introduction](<01. Introduction/001 - Course Introduction.md>) — 🚀 Chào mừng bạn đến với Khóa học LangChain: Xây dựng AI Agent với LangChain & LangGraph (Phiên bản Mới Nhất!)
- [002 - Course Objectives](<01. Introduction/002 - Course Objectives.md>) — 🎯 Mục tiêu Khóa học & Đối tượng phù hợp: Bạn sẽ nhận được gì và cần chuẩn bị những gì?
- [003 - Course Structure](<01. Introduction/003 - Course Structure.md>) — 📚 Cấu trúc Khóa học & Bí kíp "Phá đảo" nền tảng Udemy (Đừng bỏ qua phần này nhé!)
- [004 - Course Community](<01. Introduction/004 - Course Community.md>) — 💬 Cộng đồng Khóa học: Không gian kết nối và hỗ trợ tối đa

## 02. The GIST of LangChain- Get started by with your Hello World chain

- [005 - What is LangChain](<02. The GIST of LangChain- Get started by with your Hello World chain/005 - What is LangChain.md>) — 🧭 LangChain là gì? Giải mã framework "xương sống" của ứng dụng LLM trong 6 phút
- [006 - What Are We Building](<02. The GIST of LangChain- Get started by with your Hello World chain/006 - What Are We Building.md>) — 🎯 Chúng ta sẽ xây gì? Viết chiếc "Hello World" đầu tiên với LangChain
- [007 - Project Setup](<02. The GIST of LangChain- Get started by with your Hello World chain/007 - Project Setup.md>) — ⚙️ Project Setup: Dựng môi trường từ con số không (15 phút "khô khan" nhưng đáng giá!)
- [008 - LangChain Fundamentals](<02. The GIST of LangChain- Get started by with your Hello World chain/008 - LangChain Fundamentals.md>) — 🧩 LangChain Fundamentals: Prompt Template, Chat Model và Chain — bộ ba nền tảng
- [009 - Building a Summarize Chain](<02. The GIST of LangChain- Get started by with your Hello World chain/009 - Building a Summarize Chain.md>) — 🔨 Xây chain đầu tiên: Tóm tắt và "đào" sự thật thú vị về Elon Musk
- [010 - Debugging and Tracing](<02. The GIST of LangChain- Get started by with your Hello World chain/010 - Debugging and Tracing.md>) — 🐛 Debug & "mổ xẻ" chain: Điều gì thực sự nằm trong một response?
- [011 - Local Models with Ollama](<02. The GIST of LangChain- Get started by with your Hello World chain/011 - Local Models with Ollama.md>) — 🦙 Chạy model "open-weights" trên máy với Ollama: Đổi LLM dễ như thay tất!
- [012 - LangSmith Tracing](<02. The GIST of LangChain- Get started by with your Hello World chain/012 - LangSmith Tracing.md>) — 🛰️ Tích hợp LangSmith: Nhìn xuyên suốt mọi bước chạy của chain
- [013 - Semantic Versioning](<02. The GIST of LangChain- Get started by with your Hello World chain/013 - Semantic Versioning.md>) — 🔢 Semantic Versioning: Vì sao bạn không cần quá lo về version của LangChain

## 03. THE GIST Of AI Agents

- [014 - What are AI Agents](<03. THE GIST Of AI Agents/014 - What are AI Agents.md>) — 🤖 AI Agent là gì? Góc nhìn tổng quan (bài "intro của intro")
- [015 - AI Job Search Agent](<03. THE GIST Of AI Agents/015 - AI Job Search Agent.md>) — 🔍 Chúng ta sẽ xây gì? AI Job Search Agent biết tự tìm việc
- [016 - Evolution of LangChain ReAct Agents](<03. THE GIST Of AI Agents/016 - Evolution of LangChain ReAct Agents.md>) — 🧬 Lịch sử tiến hóa của LangChain ReAct Agents (và vì sao chúng ta phải quay về gốc)
- [017 - Setting Up the Environment](<03. THE GIST Of AI Agents/017 - Setting Up the Environment.md>) — ⚙️ Chuẩn bị môi trường cho LangChain Search Agent (uv, Tavily & LangSmith)
- [018 - Creating Your First LangChain Agent](<03. THE GIST Of AI Agents/018 - Creating Your First LangChain Agent.md>) — 🧰 Tạo LangChain Agent đầu tiên: Tools, LLM và lần invoke "thần thánh"
- [019 - How a LangChain Agent Thinks](<03. THE GIST Of AI Agents/019 - How a LangChain Agent Thinks.md>) — 🧠 Từ câu hỏi đến câu trả lời: bên trong "cái đầu" của LangChain Agent
- [020 - Real-World Search with Tavily](<03. THE GIST Of AI Agents/020 - Real-World Search with Tavily.md>) — 🌐 Tích hợp tìm kiếm thực tế với Tavily và LangChain Tools
- [021 - Structured Output with Pydantic](<03. THE GIST Of AI Agents/021 - Structured Output with Pydantic.md>) — 📦 Structured Output với Pydantic: cho agent trả lời "đúng khuôn"
- [022 - Predictable Agent Responses](<03. THE GIST Of AI Agents/022 - Predictable Agent Responses.md>) — 🧩 Structured Output nhìn từ bên trong: Tool strategy hay Provider strategy?

## 04. Agents Under The Hood 1-4

- [023 - Core Architecture of AI Agents](<04. Agents Under The Hood 1-4/023 - Core Architecture of AI Agents.md>) — 🕵️ Kiến trúc lõi của AI Agent: bóc từng lớp "ma thuật" (Layer 0 → Layer 3)
- [024 - An E-Commerce Agent](<04. Agents Under The Hood 1-4/024 - An E-Commerce Agent.md>) — 🛒 Chúng ta sẽ xây gì? Một E-Commerce Agent tính giá sau giảm
- [025 - The Gist of ReACT](<04. Agents Under The Hood 1-4/025 - The Gist of ReACT.md>) — 🔁 Góc nhìn tổng quan về ReAct: vòng lặp đằng sau mọi autonomous agent
- [026 - Setup](<04. Agents Under The Hood 1-4/026 - Setup.md>) — 🛠️ Setup môi trường cho "Agents Under The Hood" (uv + Ollama + Qwen)

## 05. Layer 1 The ReAct Loop 2-4

- [027 - Writing Tools](<05. Layer 1 The ReAct Loop 2-4/027 - Writing Tools.md>) — 🧰 Viết Tool đầu tiên với LangChain: Khởi động Layer 1 — ReAct Loop!
- [028 - Tool Binding and Defensive Prompting](<05. Layer 1 The ReAct Loop 2-4/028 - Tool Binding and Defensive Prompting.md>) — 🛡️ Tool Binding và Defensive Prompting: Dạy Agent biết "kỷ luật" trước khi ra trận
- [029 - ReAct Agent Loop in LangChain](<05. Layer 1 The ReAct Loop 2-4/029 - ReAct Agent Loop in LangChain.md>) — 🔄 Tự tay viết ReAct Agent Loop trong LangChain: Từ Thought đến Final Answer
- [030 - Model Switch](<05. Layer 1 The ReAct Loop 2-4/030 - Model Switch.md>) — 🔀 Model Switch: Đổi model chỉ bằng một chuỗi ký tự — nhưng đã đủ chưa?

## 06. Layer 2 Raw Function Calling 3-4

- [031 - Manual JSON Schemas](<06. Layer 2 Raw Function Calling 3-4/031 - Manual JSON Schemas.md>) — 📋 Manual JSON Schemas: Tự tay "đóng gói" tool khi rời bỏ LangChain
- [032 - Raw Ollama Agent Loop](<06. Layer 2 Raw Function Calling 3-4/032 - Raw Ollama Agent Loop.md>) — 🔧 Dựng lại ReAct Agent Loop bằng Raw Ollama SDK: Khi không còn LangChain che chở
- [033 - Recap](<06. Layer 2 Raw Function Calling 3-4/033 - Recap.md>) — 🧅 Recap Layer 2: Nhìn lại hành trình bóc tách các lớp abstraction

## 07. Layer 3 The ReAct Prompt 4-4

- [034 - The ReAct Prompt](<07. Layer 3 The ReAct Prompt 4-4/034 - The ReAct Prompt.md>) — 🧠 ReAct Prompt: Prompt quan trọng nhất trong AI Engineering (Nền tảng của mọi Agent)
- [035 - Dynamic Tool Descriptions](<07. Layer 3 The ReAct Prompt 4-4/035 - Dynamic Tool Descriptions.md>) — 🐍 Sinh Tool Descriptions động bằng Python: "Kể chuyện" về tool cho LLM nghe
- [037 - Manual Tool Calling](<07. Layer 3 The ReAct Prompt 4-4/037 - Manual Tool Calling.md>) — 🛠️ Manual Tool Calling: Tự tay điều khiển LLM bằng Prompt thuần

## 08. Function Calling

- [039 - Function Calling Intro](<08. Function Calling/039 - Function Calling Intro.md>) — 🚀 Function Calling: Bước tiến hóa tất yếu từ ReAct Prompt
- [040 - Understanding Function Calling](<08. Function Calling/040 - Understanding Function Calling.md>) — 📚 Hiểu tường tận Function Calling cho LLM: Từ JSON đẹp đến "hộp đen" reasoning

## 09. The GIST of RAG- Embeddings Vector Databases and Retrieval

- [041 - Introduction to RAG](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/041 - Introduction to RAG.md>) — 🧠 RAG là gì? Giải mã bài toán "hỏi đáp trên tài liệu khổng lồ" (Đừng bỏ qua phần motivation này nhé!)
- [042 - Introduction to RAG Implementation](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/042 - Introduction to RAG Implementation.md>) — 🔍 Embeddings, Vector Database & RAG: Toàn cảnh lý thuyết trước khi bắt tay vào code
- [043 - Medium Analyzer Boilerplate Setup](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/043 - Medium Analyzer Boilerplate Setup.md>) — 🛠️ Medium Analyzer: Boilerplate Setup — Chuẩn bị "bệ phóng" cho cả pipeline RAG
- [044 - Medium Analyzer Class Review](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/044 - Medium Analyzer Class Review.md>) — 🧩 Medium Analyzer: "Mổ xẻ" Loaders, Text Splitter, Embeddings & Pinecone trước khi vào code
- [045 - Ingestion Implementation](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/045 - Ingestion Implementation.md>) — 🗂️ Ingestion Implementation: Nạp trọn bộ Medium Blog vào Vector Database
- [046 - Recap](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/046 - Recap.md>) — 🔁 Recap: Data Indexing đã xong — chính thức bước sang chương Retrieval
- [047 - Naive Retrieval Implementation](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/047 - Naive Retrieval Implementation.md>) — 🔍 Naive Retrieval Implementation: Tự tay dựng RAG pipeline từ A đến Z
- [048 - 2 Step RAG](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/048 - 2 Step RAG.md>) — 🧪 2-Step RAG với LCEL: Gói trọn pipeline vào một Runnable Chain
- [049 - RAG Documentation](<09. The GIST of RAG- Embeddings Vector Databases and Retrieval/049 - RAG Documentation.md>) — 🧐 Đọc tài liệu RAG của LangChain: Yêu thích nhưng vẫn phải... phê bình!

## 10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory

- [050 - What Are We Building](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/050 - What Are We Building.md>) — 🚀 Chúng ta sẽ xây gì? Trợ lý tra cứu tài liệu "phiên bản Cursor thu nhỏ" (RAG)
- [051 - Environment Setup](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/051 - Environment Setup.md>) — ⚙️ Chuẩn bị "chiến trường": Clone repo, tạo index Pinecone và cài đặt môi trường
- [052 - Ingestion Pipeline Intro](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/052 - Ingestion Pipeline Intro.md>) — 🗺️ Tổng quan Ingestion Pipeline: Chặng "nạp dữ liệu" của RAG
- [053 - Imports](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/053 - Imports.md>) — 🧩 Imports & Khởi tạo: "Nạp đạn" cho Ingestion Pipeline
- [054 - Tavily Crawling](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/054 - Tavily Crawling.md>) — 🕷️ Tavily Crawling: Kéo toàn bộ tài liệu LangChain về trong vài giây
- [055 - TavilyMap and TavilyExtract](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/055 - TavilyMap and TavilyExtract.md>) — 🧪 [Optional] TavilyMap & TavilyExtract: Tự tay điều khiển từng bước crawl
- [056 - Crawling Deep Dive](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/056 - Crawling Deep Dive.md>) — 🕵️ [Optional] Crawling Deep Dive: Map + Extract, batch processing và xử lý rate limit
- [057 - Quick Recap](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/057 - Quick Recap.md>) — 🛑 Quick Recap: Dừng lại một nhịp và nhìn lại RAG Ingestion Pipeline
- [058 - Chunking](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/058 - Chunking.md>) — ✂️ Chunking: Chia nhỏ tài liệu LangChain để RAG "nhẹ gánh" hơn
- [059 - Batch Indexing](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/059 - Batch Indexing.md>) — 🚀 Batch Indexing: Đưa tài liệu vào Vector Store theo lô
- [060 - Retrieval Agent](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/060 - Retrieval Agent.md>) — 🔍 Retrieval Agent: Chắp cánh cho Documentation Helper
- [061 - Run, Debug & Trace](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/061 - Run, Debug & Trace.md>) — 🐞 Chạy, Debug và Trace RAG Agent: Mổ xẻ từng message trong LangSmith
- [062 - Streamlit Frontend](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/062 - Streamlit Frontend.md>) — 🖥️ Frontend với Streamlit: Giao diện "chớp nhoáng" cho RAG Agent
- [063 - Documentation Helper in Production](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/063 - Documentation Helper in Production.md>) — 🏭 Documentation Helper trong Production: Học từ Chat LangChain
- [064 - RAG Architecture](<10. Building a documentation assistant Embeddings VectorDBs Retrieval Memory/064 - RAG Architecture.md>) — 🧭 RAG Architecture: Two-step, RAG Agent hay Hybrid?

## 11. Prompt Engineering Theory

- [065 - The GIST of LLMs](<11. Prompt Engineering Theory/065 - The GIST of LLMs.md>) — 🧠 Hiểu tận gốc LLM: Mô hình ngôn ngữ thực chất đang "đoán chữ" như thế nào?
- [066 - What is a Prompt](<11. Prompt Engineering Theory/066 - What is a Prompt.md>) — 🧩 Prompt là gì? Khám phá 4 thành phần của một prompt chuẩn chỉnh
- [067 - Zero Shot Prompting](<11. Prompt Engineering Theory/067 - Zero Shot Prompting.md>) — ⚡ Zero Shot Prompting: Khi AI trả lời mà không cần bạn "mớm" ví dụ
- [068 - Few Shot Prompting](<11. Prompt Engineering Theory/068 - Few Shot Prompting.md>) — 🎯 Few Shot Prompting: "Dạy" AI bằng vài ví dụ để có kết quả như ý
- [069 - Chain of Thought Prompting](<11. Prompt Engineering Theory/069 - Chain of Thought Prompting.md>) — 🧮 Chain of Thought Prompting: Dạy AI suy luận từng bước như con người
- [070 - ReAct Prompting](<11. Prompt Engineering Theory/070 - ReAct Prompting.md>) — 🎭 ReAct Prompting: Khi AI vừa suy luận vừa hành động như con người
- [071 - Prompt Engineering Quick Tips](<11. Prompt Engineering Theory/071 - Prompt Engineering Quick Tips.md>) — 💡 Prompt Engineering Quick Tips: 3 mẹo "low hanging fruit" thay đổi chất lượng prompt
- [072 - Context Engineering](<11. Prompt Engineering Theory/072 - Context Engineering.md>) — 🧠 Context Engineering: Bước tiến hóa của Prompt Engineering (và vì sao agent cần nó)
- [073 - Context Engineering a System Prompt](<11. Prompt Engineering Theory/073 - Context Engineering a System Prompt.md>) — 🧩 Context Engineering cho System Prompt: Bài học từ "vùng Goldilocks"

## 12. Lets Talk About LLM Applications In Production

- [074 - LLM Applications in Production](<12. Lets Talk About LLM Applications In Production/074 - LLM Applications in Production.md>) — 🤖 Đưa LLM Agent lên Production: Những thách thức thật không ai nói trước với bạn
- [075 - LLM Application Development Landscape](<12. Lets Talk About LLM Applications In Production/075 - LLM Application Development Landscape.md>) — 🗺️ Toàn cảnh ứng dụng LLM: Bốn mẫu bài toán mình thường thấy
- [076 - Privacy and Data Retention](<12. Lets Talk About LLM Applications In Production/076 - Privacy and Data Retention.md>) — 🔐 Privacy & Data Retention: Những câu hỏi bạn phải trả lời trước khi dùng Managed LLM
- [077 - Generative UI UX with CopilotKit](<12. Lets Talk About LLM Applications In Production/077 - Generative UI UX with CopilotKit.md>) — 🎨 Generative UI/UX với CopilotKit: Giao diện chính là nơi niềm tin bắt đầu
- [078 - Official LangChain Academy Courses](<12. Lets Talk About LLM Applications In Production/078 - Official LangChain Academy Courses.md>) — 🎓 LangChain Academy: Kho khóa học miễn phí từ chính đội ngũ LangChain
- [079 - Open Source LLMs vs Managed LLMs](<12. Lets Talk About LLM Applications In Production/079 - Open Source LLMs vs Managed LLMs.md>) — ⚔️ Open Source LLM vs Managed LLM: Doanh nghiệp nên chọn bên nào?
- [080 - Confidence in AI Results](<12. Lets Talk About LLM Applications In Production/080 - Confidence in AI Results.md>) — 💡 Vì sao sản phẩm AI thành công? Công thức "Care" của Assaf Elovic & Harrison Chase
- [081 - AI FOMO is the New Normal](<12. Lets Talk About LLM Applications In Production/081 - AI FOMO is the New Normal.md>) — 😵💫 AI FOMO là chuyện thường ngày: Khi chính Karpathy cũng thấy mình tụt lại
- [082 - Finished the Course What Next](<12. Lets Talk About LLM Applications In Production/082 - Finished the Course What Next.md>) — 🎓 Hoàn thành khóa học rồi! Bước tiếp theo của bạn là gì?

## 13. Introduction To LangGraph

- [083 - What is LangGraph](<13. Introduction To LangGraph/083 - What is LangGraph.md>) — 🕸️ LangGraph là gì? Khi Agent cần một "chiều không gian" mới để tiến hóa
- [084 - LangGraph vs LangChain](<13. Introduction To LangGraph/084 - LangGraph vs LangChain.md>) — ⚖️ Vì sao LangGraph ra đời? Cuộc "so găng" chi tiết với LangChain
- [085 - What are Graphs](<13. Introduction To LangGraph/085 - What are Graphs.md>) — 📐 Graph và State Machine: Hai khái niệm nền tảng trước khi bước vào LangGraph
- [086 - Flow Engineering](<13. Introduction To LangGraph/086 - Flow Engineering.md>) — 🧠 Flow Engineering là gì? Nghệ thuật "vẽ" luồng cho AI thay vì để AI tự bơi
- [087 - Core Components](<13. Introduction To LangGraph/087 - Core Components.md>) — 🧩 Giải phẫu LangGraph: Nodes, Edges, State và những viên gạch đầu tiên
- [088 - ReAct AgentExecutor Hands-On](<13. Introduction To LangGraph/088 - ReAct AgentExecutor Hands-On.md>) — 🛠️ Hands-On: Dựng ReAct Agent Executor bằng LangGraph — bài "hello world" của Agents
- [089 - ReAct Agent Project Setup](<13. Introduction To LangGraph/089 - ReAct Agent Project Setup.md>) — 🛠️ Dựng nền móng cho ReAct Agent: Cài đặt môi trường dự án từ A đến Z
- [090 - Coding the Agent Brain](<13. Introduction To LangGraph/090 - Coding the Agent Brain.md>) — 🧠 Lập trình "bộ não" của Agent: Hiện thực ReAct Runnable với Function Calling
- [091 - Defining Agent Nodes](<13. Introduction To LangGraph/091 - Defining Agent Nodes.md>) — 🧩 Những "viên gạch" đầu tiên: Định nghĩa các node cho ReAct Agent trong LangGraph
- [092 - Connecting Nodes into a Graph](<13. Introduction To LangGraph/092 - Connecting Nodes into a Graph.md>) — 🔗 Đưa ReAct Agent "sống dậy": Nối các node thành một Graph hoàn chỉnh
- [093 - Running the ReAct Agent](<13. Introduction To LangGraph/093 - Running the ReAct Agent.md>) — 🏃 Chạy thử ReAct Agent: Gọi tool thật, nhìn trace thật
- [094 - Evolution of LLM Agents](<13. Introduction To LangGraph/094 - Evolution of LLM Agents.md>) — 🕰️ Từ ReAct Paper đến LangGraph v1.0: Hành trình tiến hóa của LLM Agent

## 14. Reflection Agent

- [095 - Reflection Agent Overview](<14. Reflection Agent/095 - Reflection Agent Overview.md>) — 🤖 Reflection Agent: Xây "cỗ máy" giúp AI tự phê bình và hoàn thiện chính mình
- [096 - Project Setup](<14. Reflection Agent/096 - Project Setup.md>) — 🛠️ Project Setup: Dựng "bệ phóng" cho Reflection Agent với Poetry, PyCharm và biến môi trường
- [097 - Reflector and Revisor Chains](<14. Reflection Agent/097 - Reflector and Revisor Chains.md>) — 🧩 Reflector & Revisor: Bộ đôi chain "phê bình – viết lại" cho Reflection Agent
- [098 - Defining Our Graph](<14. Reflection Agent/098 - Defining Our Graph.md>) — 🗺️ Defining Our Graph: Lắp "vòng lặp hoàn hảo" cho Reflection Agent với LangGraph
- [099 - LangSmith Tracing](<14. Reflection Agent/099 - LangSmith Tracing.md>) — 🔬 LangSmith Tracing: "Chụp X-quang" từng bước suy nghĩ của Reflection Agent

## 15. Reflexion Agent

- [100 - Reflexion Agent Overview](<15. Reflexion Agent/100 - Reflexion Agent Overview.md>) — 🧠 Reflexion Agent: Khi agent biết tự phản chiếu, tìm kiếm và trích dẫn nguồn
- [101 - Project Setup](<15. Reflexion Agent/101 - Project Setup.md>) — 🛠️ Project Setup: Chuẩn bị môi trường cho Reflexion Agent (Poetry, PyCharm, .env)
- [102 - Actor Agent](<15. Reflexion Agent/102 - Actor Agent.md>) — 🎭 Actor Agent: "Chuyên gia nghiên cứu" viết bản nháp đầu tiên với structured output
- [103 - Revisor Agent](<15. Reflexion Agent/103 - Revisor Agent.md>) — ✍️ Revisor Agent: Vòng lặp "đọc phê bình – thêm nguồn – viết lại"
- [104 - ToolNode and Executing Tools](<15. Reflexion Agent/104 - ToolNode and Executing Tools.md>) — 🛠️ ToolNode & Executing Tools: Cho agent "ra ngoài internet" với Tavily
- [105 - Building Our Graph](<15. Reflexion Agent/105 - Building Our Graph.md>) — 🧱 Building Our Graph: Lắp ráp Reflexion Agent hoàn chỉnh với LangGraph 1.x
- [106 - Tracing Our Graph](<15. Reflexion Agent/106 - Tracing Our Graph.md>) — 📊 Tracing Our Graph: Đọc "nhật ký hành trình" của Reflexion Agent trên LangSmith

## 16. Agentic RAG

- [107 - Agentic RAG Architecture](<16. Agentic RAG/107 - Agentic RAG Architecture.md>) — 🧠 Xây gì trong Section này? Kiến trúc Agentic RAG nâng cao (Reflection + Routing)
- [108 - Corrective RAG Flow](<16. Agentic RAG/108 - Corrective RAG Flow.md>) — 🔍 Nâng tầm chất lượng RAG với Corrective RAG: Khi tài liệu "lệch sóng" thì phải làm sao?
- [109 - Boilerplate Setup for Agentic RAG](<16. Agentic RAG/109 - Boilerplate Setup for Agentic RAG.md>) — ⚙️ Khởi tạo dự án Agentic RAG: Poetry, PyCharm và những cập nhật mới nhất của LangChain
- [110 - Code Structure](<16. Agentic RAG/110 - Code Structure.md>) — 🗂️ Cấu trúc Code "chuẩn production": Repository phải phản chiếu kiến trúc của bạn
- [111 - Vector Store Ingestion Pipeline](<16. Agentic RAG/111 - Vector Store Ingestion Pipeline.md>) — 🗄️ Pipeline Ingestion cho Vector Store: Từ bài viết trên web đến ChromaDB
- [112 - Managing Information Flow with GraphState](<16. Agentic RAG/112 - Managing Information Flow with GraphState.md>) — 🧩 GraphState: "Dòng máu" chảy qua mọi node trong LangGraph
- [113 - The Retrieve Node](<16. Agentic RAG/113 - The Retrieve Node.md>) — 🔍 Retrieve Node: Bước đầu tiên để lấy ngữ cảnh cho LLM trong LangGraph
- [114 - Relevance Filter](<16. Agentic RAG/114 - Relevance Filter.md>) — 🎯 Relevance Filter: Dạy RAG biết lọc tài liệu trước khi trả lời (Structured Output thực chiến)
- [115 - Web Search Node](<16. Agentic RAG/115 - Web Search Node.md>) — 🌐 Web Search Node với Tavily: Khi kho tài liệu nội bộ "không đủ dùng"
- [116 - Generation Chain and Node](<16. Agentic RAG/116 - Generation Chain and Node.md>) — ✍️ Generation Node: Đưa tài liệu vào LLM và sinh câu trả lời cuối cùng
- [117 - Complete LangGraph Agent](<16. Agentic RAG/117 - Complete LangGraph Agent.md>) — 🧩 Ghép nối Graph hoàn chỉnh: Khi mọi node "nối vòng tay lớn" và agent chạy thật
- [118 - Self-RAG Intro](<16. Agentic RAG/118 - Self-RAG Intro.md>) — 🪞 Self-RAG: Dạy Agent biết tự soi lại câu trả lời của chính mình
- [119 - Self-RAG Implementation](<16. Agentic RAG/119 - Self-RAG Implementation.md>) — 🧠 Self-RAG Implementation: Hai "giám khảo" canh chừng câu trả lời của LLM
- [120 - Adaptive RAG](<16. Agentic RAG/120 - Adaptive RAG.md>) — 🧭 Adaptive RAG: Chiếc "bộ định tuyến" đưa câu hỏi đi đúng luồng

## 17. Introduction to Model Context Protocol MCP

- [121 - Why MCP](<17. Introduction to Model Context Protocol MCP/121 - Why MCP.md>) — 🧩 Vì sao chúng ta cần MCP? (Giải mã "cổng cắm vạn năng" cho mọi AI Application)
- [122 - How LLMs Use Tools](<17. Introduction to Model Context Protocol MCP/122 - How LLMs Use Tools.md>) — 🔧 LLM thực sự "dùng tool" như thế nào? (Toàn bộ sự thật về Tool Calling)
- [123 - MCP Architecture](<17. Introduction to Model Context Protocol MCP/123 - MCP Architecture.md>) — 🏗️ Kiến trúc MCP: Host, Client, Server (Và câu chuyện nhờ Cursor đặt đồ ăn)
- [124 - The Gist of the Protocol](<17. Introduction to Model Context Protocol MCP/124 - The Gist of the Protocol.md>) — 🔄 Toàn cảnh luồng chạy của MCP: Một câu hỏi đi qua những "trạm" nào?
- [125 - MCP Servers](<17. Introduction to Model Context Protocol MCP/125 - MCP Servers.md>) — 🖥️ MCP Server: Ba giao diện cốt lõi và bốn cách sở hữu (Cẩm nang từ A đến Z)

## 18. Using a Pre-built Server mcpdoc with AI Clients Cursor and Claude

- [126 - What We Are Building](<18. Using a Pre-built Server mcpdoc with AI Clients Cursor and Claude/126 - What We Are Building.md>) — 🧭 MCP Doc là gì và chúng ta sắp xây gì? (Điểm khởi đầu của hành trình MCP)
- [127 - MCP Inspector](<18. Using a Pre-built Server mcpdoc with AI Clients Cursor and Claude/127 - MCP Inspector.md>) — 🕵️ MCP Inspector: "Kính hiển vi" để soi và debug MCP Server (Công cụ mã nguồn mở từ Anthropic)
- [128 - LLMs.txt](<18. Using a Pre-built Server mcpdoc with AI Clients Cursor and Claude/128 - LLMs.txt.md>) — 📄 llms.txt là gì? "Bản đồ định vị" website dành cho LLM và AI Agent
- [129 - mcpdoc](<18. Using a Pre-built Server mcpdoc with AI Clients Cursor and Claude/129 - mcpdoc.md>) — 🔬 Thực hành mcpdoc: Từ clone repo đến câu trả lời "grounded" trong Claude Desktop

## 19. Building MCP Servers and Clients with LangChain

- [130 - MCP Servers and Clients Intro](<19. Building MCP Servers and Clients with LangChain/130 - MCP Servers and Clients Intro.md>) — 🚀 Từ Người Dùng đến Người Xây: Tự Tay Viết MCP Server và MCP Client với LangChain
- [131 - Project Boilerplate](<19. Building MCP Servers and Clients with LangChain/131 - Project Boilerplate.md>) — 🧰 Boilerplate Dự Án MCP: Khởi Tạo, Cấu Hình và Sẵn Sàng Lên Đường
- [132 - Building MCP Servers](<19. Building MCP Servers and Clients with LangChain/132 - Building MCP Servers.md>) — 🧮 Hai MCP Server Đầu Tiên: Toán Học qua STDIO và Thời Tiết qua SSE
- [133 - SSE MCP Server Deep Dive](<19. Building MCP Servers and Clients with LangChain/133 - SSE MCP Server Deep Dive.md>) — 🔍 SSE MCP Server: Từ Máy Cá Nhân đến Cloud Doanh Nghiệp
- [134 - Simple MCP Client](<19. Building MCP Servers and Clients with LangChain/134 - Simple MCP Client.md>) — 🔌 MCP Client Đa Server: Một Client Kết Nối Cả Thế Giới Công Cụ
- [135 - LangChain MCP Adapter Explained](<19. Building MCP Servers and Clients with LangChain/135 - LangChain MCP Adapter Explained.md>) — 🌉 LangChain MCP Adapter: Cầu Nối Giữa Hai Thế Giới Tool

## 20. Useful tools when developing LLM Applications

- [139 - LangChain Official Docs MCP Server](<20. Useful tools when developing LLM Applications/139 - LangChain Official Docs MCP Server.md>) — ⚠️ Đừng Để AI Viết Code "Cũ": LangChain Official MCP Server Cứu Bạn
- [140 - LangChain Hub](<20. Useful tools when developing LLM Applications/140 - LangChain Hub.md>) — 🗂️ LangChain Hub: Kho Prompt Cộng Đồng Cho Mọi Use Case
- [141 - Text Splitter Playground](<20. Useful tools when developing LLM Applications/141 - Text Splitter Playground.md>) — 🧩 Text Splitter Playground: "Nhìn" Tận Mắt Cách Dữ Liệu Bị Chia Nhỏ
- [142 - LangChain vs LlamaIndex](<20. Useful tools when developing LLM Applications/142 - LangChain vs LlamaIndex.md>) — ⚔️ LangChain vs LlamaIndex: Chọn "Vũ Khí" Nào Cho LLM App?

## 21. Deep Agents

- [143 - Introduction to Deep Agents](<21. Deep Agents/143 - Introduction to Deep Agents.md>) — 🧠 Chào mừng đến với Deep Agents: Khi AI Agent bước vào kỷ nguyên "chạy đường dài"
- [144 - Taxonomy of Agents](<21. Deep Agents/144 - Taxonomy of Agents.md>) — 🗺️ Bản đồ các loại Agent: Shallow Agents, Deep Agents và Coding Agents
- [145 - Dynamic To-Do Lists](<21. Deep Agents/145 - Dynamic To-Do Lists.md>) — ✅ Dynamic To-Do Lists: Cách Deep Agents "chia để trị" tác vụ phức tạp
- [146 - Sub Agents and Delegation](<21. Deep Agents/146 - Sub Agents and Delegation.md>) — 🤝 Sub Agents & Hierarchical Delegation: Khi Deep Agent biết "ủy quyền"
- [147 - Subagents Context Flow](<21. Deep Agents/147 - Subagents Context Flow.md>) — 🗺️ Subagents Context Flow: Nghệ thuật "nén" context của Deep Agents
- [148 - File Systems](<21. Deep Agents/148 - File Systems.md>) — 📂 File Systems: "Cỗ máy" Context Engineering của Deep Agents

## 22. Deep Agents Skills

- [149 - The 3 Layers of Agent Skills](<22. Deep Agents Skills/149 - The 3 Layers of Agent Skills.md>) — 🧅 3 Lớp hiểu biết về Agent Skills: Từ cách dùng đến tận mã nguồn
- [150 - Level 1 Skills in the CLI](<22. Deep Agents Skills/150 - Level 1 Skills in the CLI.md>) — 🎬 Level 1: Dùng Agent Skills trong Deep Agents CLI (Thực hành cùng Remotion)
- [151 - Layer 2 Tracing with LangSmith](<22. Deep Agents Skills/151 - Layer 2 Tracing with LangSmith.md>) — 🔍 Level 2: Tracing Agent Skills với LangSmith — Chuyện gì thực sự được gửi vào LLM?
- [152 - Recap Skill Middleware](<22. Deep Agents Skills/152 - Recap Skill Middleware.md>) — 🔄 Recap: LangChain Deep Agents triển khai Skill Middleware thế nào?
- [153 - Layer 3 Inside skills.py](<22. Deep Agents Skills/153 - Layer 3 Inside skills.py.md>) — 🧬 Level 3: Bên trong `skills.py` — Cơ chế Progressive Disclosure

## 23. LangChain Glossary

- [157 - Chat Models](<23. LangChain Glossary/157 - Chat Models.md>) — 🧠 Chat Models: Cánh cổng chuẩn hóa để trò chuyện với mọi LLM
- [158 - Messages](<23. LangChain Glossary/158 - Messages.md>) — 💬 Messages: "Viên gạch" nền tảng của mọi cuộc trò chuyện với LLM
- [159 - Recursive Character Text Splitter](<23. LangChain Glossary/159 - Recursive Character Text Splitter.md>) — ✂️ RecursiveCharacterTextSplitter: Chia nhỏ văn bản mà không phá vỡ ngữ nghĩa
- [160 - Document](<23. LangChain Glossary/160 - Document.md>) — 📄 Document: "Chiếc hộp" chuẩn chứa văn bản và ngữ cảnh trong LangChain
- [161 - Token Limitation Strategies](<23. LangChain Glossary/161 - Token Limitation Strategies.md>) — 🧮 Vượt giới hạn token: Stuffing, Map Reduce và Refine trong LangChain
- [162 - Memory and Co-Reference Resolution](<23. LangChain Glossary/162 - Memory and Co-Reference Resolution.md>) — 🧠 Memory phần 1: Khi LLM "mất trí nhớ" và phép màu mang tên coreference resolution
- [163 - Memory Theory Deepdive](<23. LangChain Glossary/163 - Memory Theory Deepdive.md>) — 🗄️ Memory phần 2: Ba cách lưu ký ức và vai trò "người gác kho" của LangGraph

## 24. Industry Insights Building Production Agents with Assaf Elovic

- [164 - Production-Grade AI Architecture](<24. Industry Insights Building Production Agents with Assaf Elovic/164 - Production-Grade AI Architecture.md>) — 🏗️ Kiến trúc AI chuẩn production năm 2026: Observability, AI Gateway và những thứ không thể thiếu
- [165 - Making Users Trust Your AI Agents](<24. Industry Insights Building Production Agents with Assaf Elovic/165 - Making Users Trust Your AI Agents.md>) — 🤝 Làm sao để người dùng tin tưởng AI Agent? Bộ tiêu chí FAIR của Assaf Elovic
- [166 - Building a Lean AI Feedback Loop](<24. Industry Insights Building Production Agents with Assaf Elovic/166 - Building a Lean AI Feedback Loop.md>) — 🔁 Feedback Loop "lean": Chỉ một file Markdown là đủ để agent tốt lên mỗi ngày

## 25. Industry Insights Building Production Agents with Roy Miara

- [167 - Intro](<25. Industry Insights Building Production Agents with Roy Miara/167 - Intro.md>) — 🤝 Gặp gỡ Roy Miara: Người xây dựng "hacker tự động" tại Tenzai
- [168 - AI Agents in Cybersecurity CTF Competitions](<25. Industry Insights Building Production Agents with Roy Miara/168 - AI Agents in Cybersecurity CTF Competitions.md>) — 🏆 AI Agent chinh phục đấu trường CTF: Bí quyết lọt top 1% của Tenzai
- [169 - Harness Engineering](<25. Industry Insights Building Production Agents with Roy Miara/169 - Harness Engineering.md>) — 🛠️ Harness Engineering: Vì sao không thể "chia việc cho 100 agent" là xong?
- [170 - Managing Variance and Hallucinations in Production Agents](<25. Industry Insights Building Production Agents with Roy Miara/170 - Managing Variance and Hallucinations in Production Agents.md>) — 🎛️ Variance & Hallucination: Bài toán "không được phép sai" của Production Agent

## 26. Agent Security

> Section này không có bài transcript trong bộ sưu tập (chỉ có mục lục trên Udemy).

## 27. The Dark Side of Vibe Coding Vulnerabilities in AI-Generated Apps

> Section này không có bài transcript trong bộ sưu tập (chỉ có mục lục trên Udemy).

## 28. Bonus

> Section này không có bài transcript trong bộ sưu tập (chỉ có mục lục trên Udemy).

## 29. Agent Middleware and Harness Engineering (Beta)

- [154 - Introduction to Agent Middleware (Hooks)](<29. Agent Middleware and Harness Engineering (Beta)/154 - Introduction to Agent Middleware (Hooks).md>) — 🪝 Agent Middleware (Hooks): Chiếc chìa khóa để hiểu mọi Agent Harness
- [155 - What is Agent Middleware](<29. Agent Middleware and Harness Engineering (Beta)/155 - What is Agent Middleware.md>) — 🔌 Agent Middleware là gì? Từ FastAPI đến vòng lặp của AI Agent
- [156 - Middleware Use Cases Security & Reliability](<29. Agent Middleware and Harness Engineering (Beta)/156 - Middleware Use Cases Security & Reliability.md>) — 🛡️ Use Cases của Middleware: Context, Reliability, Cost và Security

## 30. Agent Security Foundations

- [171 - 2026 Software Engineering](<30. Agent Security Foundations/171 - 2026 Software Engineering.md>) — 🏗️ Kỹ thuật phần mềm năm 2026 đã thay đổi ra sao? (Và vì sao bảo mật trở thành câu chuyện nóng)
- [172 - Securing AI-Generated Code](<30. Agent Security Foundations/172 - Securing AI-Generated Code.md>) — 📈 Vì sao khoảng cách giữa "code được viết" và "code được bảo vệ" ngày càng lớn?
- [173 - Velocity vs Safety](<30. Agent Security Foundations/173 - Velocity vs Safety.md>) — ⚖️ Tốc độ hay An toàn? Cuộc giằng co mặc định khi đưa coding agent vào quy trình
- [174 - Two Attack Vectors](<30. Agent Security Foundations/174 - Two Attack Vectors.md>) — ⚠️ Hai bề mặt tấn công (attack surface) của kỷ nguyên agentic coding
- [175 - Skill and MCP Security](<30. Agent Security Foundations/175 - Skill and MCP Security.md>) — 🔐 Skill & MCP: "Tiện lợi" không đồng nghĩa với "an toàn"
- [176 - Demo Treat Agent Skills as RCE](<30. Agent Security Foundations/176 - Demo Treat Agent Skills as RCE.md>) — 🧪 Demo: Một skill "trông rất ổn" đã moi sạch secrets trong máy như thế nào?
- [177 - Establishing Security Boundaries](<30. Agent Security Foundations/177 - Establishing Security Boundaries.md>) — 🛡️ Dựng ranh giới an ninh (security boundaries) để chặn đứng skill độc hại
- [178 - What is LLM App Sec](<30. Agent Security Foundations/178 - What is LLM App Sec.md>) — 🧱 LLM App Sec là gì? Toàn cảnh bảo mật cho ứng dụng GenAI
