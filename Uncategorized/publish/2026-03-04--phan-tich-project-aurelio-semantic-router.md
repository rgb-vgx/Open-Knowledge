---
title: 'Phân tích Project: Aurelio Semantic Router'
date: '2026-03-04 01:13:32'
date_gmt: '2026-03-03 18:13:32'
modified: '2026-03-04 01:13:32'
status: publish
slug: phan-tich-project-aurelio-semantic-router
wordpress_id: 683
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/03/04/phan-tich-project-aurelio-semantic-router/
categories:
- Uncategorized
tags: []
---

User: Hãy phân tích project này một cách chi tiết và dễ hiểu, dành cho người hoàn toàn chưa có kiến thức về AI.

Trình bày theo các mục sau:

Project này dùng để làm gì? (giải thích đơn giản như cho người mới bắt đầu)

Cách nó hoạt động (giải thích từng bước, tránh thuật ngữ chuyên môn; nếu buộc phải dùng thì giải thích kèm theo)

Các thành phần chính trong project (mỗi phần có vai trò gì)

Ví dụ minh hoạ thực tế để tôi hình dung được cách sử dụng

Nếu tôi muốn tự chạy hoặc triển khai project này thì cần chuẩn bị gì?

GitHub Copilot:

 Let me gather more context about the project to give you a thorough explanation.

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/README.md#1-1), lines 1 to 100

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/\_\_init\_\_.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/route.py#1-1), lines 1 to 80

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/pyproject.toml#1-1), lines 1 to 80

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/route.py#80-80), lines 80 to 150

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/encoders/base.py#1-1), lines 1 to 100

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/index/base.py#1-1), lines 1 to 100

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/semantic.py#1-1), lines 1 to 120

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/encoders)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/index)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/README.md#100-100), lines 100 to 154

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/base.py#1-1), lines 1 to 100

Now I have enough context to provide a comprehensive analysis. Here's the detailed breakdown:

---

**# Phân tích Project: Semantic Router**

**## 1. Project này dùng để làm gì?**

**\*\*Hãy tưởng tượng thế này:\*\*** Bạn gọi đến tổng đài chăm sóc khách hàng. Khi bạn nói *\*"Tôi muốn hủy đơn hàng"\**, hệ thống tự động chuyển bạn đến bộ phận **\*\*xử lý đơn hàng\*\***. Khi bạn nói *\*"Thời tiết hôm nay thế nào?"\**, hệ thống biết đây là **\*\*nói chuyện phiếm\*\*** và phản hồi khác đi.

**\*\*Semantic Router\*\*** làm đúng việc đó — nhưng cho phần mềm. Nó là một **\*\*"bộ phân luồng thông minh"\*\*** giúp phần mềm nghe câu nói của người dùng và **\*\*quyết định cực nhanh\*\*** nên chuyển câu đó đi đâu để xử lý, dựa trên **\*\*ý nghĩa\*\*** của câu nói (chứ không phải so khớp từ khóa cứng nhắc).

**\*\*Tại sao cần nó?\*\*** Hiện nay các chatbot AI (như ChatGPT) rất thông minh nhưng **\*\*chậm\*\*** — mỗi lần hỏi phải chờ vài giây. Semantic Router giúp ra quyết định **\*\*trong vài mili-giây\*\*** (1/1000 giây) mà không cần gọi AI nặng nề, chỉ dựa vào toán học so sánh "ý nghĩa" của câu nói.

---

**## 2. Cách nó hoạt động (từng bước)**

**### Bước 1: Chuẩn bị các "tuyến đường" (Routes)**

Bạn định nghĩa trước các danh mục mà hệ thống cần nhận biết, kèm theo **\*\*câu mẫu\*\***:

```

Tuyến "chính trị":

  - "Bạn nghĩ gì về tổng thống?"

  - "Chính trị thật phức tạp"

  - "Đảng nào sẽ thắng?"

Tuyến "nói chuyện phiếm":

  - "Thời tiết hôm nay thế nào?"

  - "Bạn khỏe không?"

  - "Hôm nay đẹp trời quá"

```

**### Bước 2: Chuyển câu mẫu thành "tọa độ ý nghĩa" (Encoding)**

Mỗi câu mẫu được chuyển thành một **\*\*dãy số\*\*** (gọi là vector/embedding). Hãy tưởng tượng mỗi câu nói được đặt lên một **\*\*bản đồ ý nghĩa\*\*** — những câu có ý nghĩa giống nhau sẽ nằm gần nhau trên bản đồ.

Ví dụ:

- *\*"Thời tiết hôm nay ra sao?"\** và *\*"Trời đẹp quá!"\** → nằm **\*\*gần nhau\*\*** trên bản đồ

- *\*"Bạn nghĩ gì về tổng thống?"\** → nằm **\*\*xa\*\*** hai câu trên

**### Bước 3: Lưu lại bản đồ (Indexing)**

Tất cả các "tọa độ" này được lưu vào một **\*\*kho dữ liệu\*\*** (Index) để tra cứu nhanh.

**### Bước 4: Khi người dùng hỏi một câu mới**

1. Câu hỏi mới cũng được chuyển thành "tọa độ" trên cùng bản đồ

2. Hệ thống tìm xem tọa độ này **\*\*gần nhất\*\*** với nhóm câu mẫu nào

3. Trả về tên tuyến đường tương ứng

```

Người dùng hỏi: "Bầu cử năm nay ai thắng?"

→ Chuyển thành tọa độ → Gần nhất với nhóm "chính trị"

→ Kết quả: "politics"

```

Toàn bộ quá trình này mất **\*\*dưới 10 mili-giây\*\*** — nhanh hơn hàng trăm lần so với việc hỏi ChatGPT.

---

**## 3. Các thành phần chính**

**### 3.1. \*\*Route\*\* — Tuyến đường (route.py)**

Đơn vị cơ bản nhất. Mỗi Route gồm:

- **\*\*Tên\*\*** (ví dụ: "politics", "chitchat")

- **\*\*Câu mẫu\*\*** (danh sách các câu ví dụ)

- **\*\*Tuỳ chọn\*\***: Có thể gắn thêm khả năng gọi hàm (dynamic route) — ví dụ khi người dùng nói *\*"Đặt báo thức lúc 7h"\**, hệ thống không chỉ nhận ra đây là route "báo thức" mà còn trích xuất tham số `7h`.

**### 3.2. \*\*Encoder\*\* — Bộ chuyển đổi ngôn ngữ thành số (encoders)**

Đây là "bộ phiên dịch" chuyển câu nói thành dãy số để so sánh. Project hỗ trợ **\*\*20+ loại encoder\*\***:

| Loại | Mô tả |

|------|--------|

| `OpenAIEncoder` | Dùng AI của OpenAI (cần internet + API key) |

| `CohereEncoder` | Dùng AI của Cohere |

| `HuggingFaceEncoder` | Chạy model AI ngay trên máy bạn (không cần internet) |

| `FastembedEncoder` | Nhẹ, nhanh, chạy local |

| `OllamaEncoder` | Dùng Ollama chạy local |

| `BM25Encoder` / `TfidfEncoder` | Phương pháp truyền thống dựa trên từ khóa |

| ...và nhiều hơn | Google, Bedrock, Mistral, Jina, Voyage... |

Có 2 loại chính:

- **\*\*DenseEncoder\*\***: Hiểu "ý nghĩa sâu" của câu (hay dùng nhất)

- **\*\*SparseEncoder\*\***: Dựa trên từ khóa (nhanh hơn, đơn giản hơn)

**### 3.3. \*\*Index\*\* — Kho lưu trữ & tra cứu (index)**

Nơi lưu trữ tất cả các "tọa độ ý nghĩa" và tìm kiếm nhanh:

| Loại | Mô tả |

|------|--------|

| `LocalIndex` | Lưu ngay trong bộ nhớ máy (mặc định, đơn giản nhất) |

| `PineconeIndex` | Lưu trên dịch vụ cloud Pinecone (cho production lớn) |

| `QdrantIndex` | Lưu trên dịch vụ Qdrant |

| `PostgresIndex` | Lưu trong database PostgreSQL |

| `HybridLocalIndex` | Kết hợp cả dense + sparse |

**### 3.4. \*\*Router\*\* — Bộ điều phối trung tâm (routers)**

Đây là "bộ não" kết nối tất cả lại với nhau:

- **\*\*****`SemanticRouter`****\*\***: Router tiêu chuẩn — dùng một encoder chuyển câu thành số rồi so sánh

- **\*\*****`HybridRouter`****\*\***: Router nâng cao — kết hợp cả so sánh ý nghĩa (dense) VÀ so sánh từ khóa (sparse), cho kết quả chính xác hơn nhưng chậm hơn một chút

**### 3.5. \*\*LLM\*\* — Mô hình ngôn ngữ lớn (llms)**

Chỉ dùng khi cần **\*\*dynamic route\*\*** — tức khi bạn muốn hệ thống không chỉ nhận ra ý định mà còn **\*\*trích xuất thông tin\*\*** từ câu nói (ví dụ: trích xuất ngày, giờ, tên...).

---

**## 4. Ví dụ minh hoạ thực tế**

**### Ví dụ 1: Chatbot dịch vụ khách hàng**

```python

from semantic\_router import Route, SemanticRouter

from semantic\_router.encoders import OpenAIEncoder

import os

os.environ["OPENAI\_API\_KEY"] = "sk-..."

# Định nghĩa các "tuyến đường"

dat\_hang = Route(

    name="dat\_hang",

    utterances=[

        "Tôi muốn mua hàng",

        "Đặt đơn hàng mới",

        "Tôi cần mua sản phẩm X",

    ],

)

khieu\_nai = Route(

    name="khieu\_nai",

    utterances=[

        "Tôi muốn phản ánh dịch vụ",

        "Sản phẩm bị lỗi",

        "Tôi không hài lòng",

        "Dịch vụ quá tệ",

    ],

)

hoi\_gia = Route(

    name="hoi\_gia",

    utterances=[

        "Sản phẩm này giá bao nhiêu?",

        "Báo giá cho tôi",

        "Giá cả thế nào?",

    ],

)

# Khởi tạo router

encoder = OpenAIEncoder()

router = SemanticRouter(

    encoder=encoder,

    routes=[dat\_hang, khieu\_nai, hoi\_gia],

    auto\_sync="local",

)

# Khi khách hàng hỏi:

ket\_qua = router("Hàng tôi mua bị hỏng rồi!")

print(ket\_qua.name)  # → "khieu\_nai"

ket\_qua = router("Cho tôi xem bảng giá")

print(ket\_qua.name)  # → "hoi\_gia"

ket\_qua = router("Hôm nay trời đẹp quá")

print(ket\_qua.name)  # → None (không khớp tuyến nào)

```

**### Ví dụ 2: Bộ lọc an toàn cho chatbot (Guardrail)**

Ngăn chatbot trả lời các chủ đề nhạy cảm:

```python

cam = Route(

    name="noi\_dung\_cam",

    utterances=[

        "Cách hack hệ thống",

        "Làm sao để lừa đảo",

        "Hướng dẫn làm vũ khí",

    ],

)

router = SemanticRouter(encoder=encoder, routes=[cam])

cau\_hoi = "Dạy tôi cách xâm nhập máy tính"

if router(cau\_hoi).name == "noi\_dung\_cam":

    print("Xin lỗi, tôi không thể hỗ trợ nội dung này.")

else:

    # Chuyển câu hỏi đến ChatGPT để trả lời bình thường

    pass

```

**### Ví dụ 3: Dynamic Route — Trích xuất thông tin**

```python

# Khi người dùng nói "Đặt báo thức lúc 7 giờ sáng"

# → Router nhận ra: route = "bao\_thuc", tham số = {"gio": "7:00 AM"}

```

---

**## 5. Nếu muốn tự chạy / triển khai, cần chuẩn bị gì?**

**### Yêu cầu cơ bản:**

| Mục | Chi tiết |

|-----|----------|

| **\*\*Python\*\*** | Phiên bản 3.9 đến 3.13 |

| **\*\*Hệ điều hành\*\*** | Windows, macOS, hoặc Linux đều được |

| **\*\*RAM\*\*** | Tối thiểu 4GB (nếu dùng model local thì cần 8GB+) |

**### Cài đặt:**

```bash

# Cách 1: Cài bản cơ bản (cần internet + API key của OpenAI/Cohere)

pip install semantic-router

# Cách 2: Cài bản chạy hoàn toàn trên máy (không cần API key)

pip install "semantic-router[local]"

# Cách 3: Cài đầy đủ tất cả tính năng

pip install "semantic-router[all]"

```

**### API Key (nếu dùng encoder online):**

Bạn cần đăng ký tài khoản và lấy API key từ nhà cung cấp:

- **\*\*OpenAI\*\***: Đăng ký tại [platform.openai.com](https://platform.openai.com) → lấy `OPENAI\_API\_KEY`

- **\*\*Cohere\*\***: Đăng ký tại [cohere.com](https://cohere.com) → lấy `COHERE\_API\_KEY`

- Hoặc dùng encoder local (HuggingFace, Ollama) thì **\*\*không cần API key\*\***

**### Nếu muốn chạy project này từ source code (cho developer):**

```bash

# Clone code về

git clone https://github.com/aurelio-labs/semantic-router.git

cd semantic-router

# Cài đặt dependencies (project dùng uv để quản lý)

pip install uv

uv sync --extra dev

# Chạy test để kiểm tra

make test\_unit

# Chạy ví dụ

uv run jupyter notebook docs/00-introduction.ipynb

```

**### Triển khai production:**

- **\*\*Quy mô nhỏ\*\***: Dùng `LocalIndex` — lưu trong bộ nhớ, đơn giản

- **\*\*Quy mô lớn\*\***: Dùng `PineconeIndex` hoặc `PostgresIndex` — lưu trên cloud, hỗ trợ hàng triệu routes

- Cần cài thêm extra tương ứng: `pip install "semantic-router[pinecone]"` hoặc `pip install "semantic-router[postgres]"`

---

**### Tóm tắt bằng một hình ảnh:**

```

Người dùng nói: "Sản phẩm bị lỗi"

        │

        ▼

   ┌─────────────┐

   │   Encoder    │  ← Chuyển câu nói thành dãy số (tọa độ ý nghĩa)

   └──────┬──────┘

          ▼

   ┌─────────────┐

   │    Index     │  ← So sánh với tọa độ của các câu mẫu đã lưu

   └──────┬──────┘

          ▼

   ┌─────────────┐

   │   Router     │  ← Tìm route gần nhất → "khieu\_nai"

   └──────┬──────┘

          ▼

   Kết quả: route = "khieu\_nai"

   → Chuyển sang bộ phận xử lý khiếu nại

```

Về bản chất, project này giúp bạn xây dựng một **\*\*"bộ não phân loại" siêu nhanh\*\*** mà không cần gọi AI đắt tiền mỗi lần có câu hỏi mới.

User: Hãy phân tích chi tiết kiến trúc của project này.

Trình bày theo các mục sau:

Tổng quan kiến trúc (project theo mô hình gì? monolith, microservice, MVC, clean architecture…?)

Sơ đồ cấu trúc thư mục (liệt kê và giải thích vai trò từng folder cấp cao nhất trước)

Giải thích chi tiết từng folder:

Folder này dùng để làm gì?

Chứa loại code gì?

Có phụ thuộc vào folder nào khác không?

Giải thích từng file quan trọng:

File này có vai trò gì?

Được gọi từ đâu?

Ảnh hưởng đến phần nào của hệ thống?

Luồng chạy chính của chương trình (từ khi start đến khi xử lý xong một request)

Nếu có thể, hãy mô tả theo kiểu dễ hiểu cho người mới, kèm ví dụ minh hoạ.

GitHub Copilot:

Created 7 todos

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/llms)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/utils)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/tests)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/encoders)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/index)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers)

Starting: *\*Analyze core modules\** (2/7)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/\_\_init\_\_.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/schema.py#1-1), lines 1 to 120

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/route.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/linear.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/tokenizers.py#1-1), lines 1 to 80

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/base.py#100-100), lines 100 to 250

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/schema.py#120-120), lines 120 to 599

Starting: *\*Analyze routers in detail\** (3/7)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/base.py#250-250), lines 250 to 450

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/semantic.py#100-100), lines 100 to 179

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/hybrid.py#1-1), lines 1 to 200

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/base.py#450-450), lines 450 to 700

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/base.py#700-700), lines 700 to 900

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/encoders/base.py#100-100), lines 100 to 152

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/encoders/openai.py#1-1), lines 1 to 100

Starting: *\*Analyze encoders architecture\** (4/7)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/encoders/\_\_init\_\_.py#1-1), lines 1 to 50

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/index/local.py#1-1), lines 1 to 200

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/llms/base.py#1-1), lines 1 to 100

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/llms/\_\_init\_\_.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/utils/defaults.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/utils/function\_call.py#1-1), lines 1 to 80

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/utils/logger.py#1-1), lines 1 to 50

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/index/\_\_init\_\_.py)

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/index/base.py#100-100), lines 100 to 250

Read [](file:///home/thuyetmt/work/viettel/aurelio-labs/semantic-router/semantic\_router/routers/base.py#900-900), lines 900 to 1100

Starting: *\*Write comprehensive analysis\** (7/7)

Now I have comprehensive understanding of the entire codebase. Here's the detailed architecture analysis:

---

**# Phân tích chi tiết kiến trúc Project Semantic Router**

---

**## 1. Tổng quan kiến trúc**

**### Mô hình: \*\*Layered Architecture + Strategy Pattern\*\***

Project **\*\*không\*\*** theo MVC, microservice hay clean architecture truyền thống. Thay vào đó, nó là một **\*\*thư viện Python (library)\*\*** được thiết kế theo kiến trúc **\*\*phân lớp (layered)\*\*** kết hợp với **\*\*Strategy Pattern\*\*** (mẫu thiết kế chiến lược).

```

┌─────────────────────────────────────────────────────────┐

│                    TẦNG GIAO DIỆN (API Layer)           │

│         SemanticRouter / HybridRouter                   │

│         (Người dùng chỉ cần tương tác ở đây)           │

├─────────────────────────────────────────────────────────┤

│                    TẦNG NGHIỆP VỤ (Business Layer)     │

│    Route  │  RouterConfig  │  Schema  │  Sync Logic    │

├─────────────────────────────────────────────────────────┤

│                    TẦNG HẠ TẦNG (Infrastructure Layer)  │

│    Encoders     │      Indexes      │      LLMs        │

│  (20+ loại)     │   (5+ loại)       │   (7+ loại)      │

├─────────────────────────────────────────────────────────┤

│                    TẦNG TIỆN ÍCH (Utilities Layer)     │

│    linear.py  │  tokenizers.py  │  logger  │  defaults  │

└─────────────────────────────────────────────────────────┘

```

**\*\*Tại sao gọi là Strategy Pattern?\*\***

- Encoder, Index, LLM đều là **\*\*có thể hoán đổi được\*\*** (pluggable). Bạn có thể thay OpenAIEncoder bằng CohereEncoder mà không cần thay đổi code ở Router.

- Mỗi "chiến lược" (strategy) được đóng gói trong một class con kế thừa từ base class.

**\*\*Đặc điểm nổi bật:\*\***

- **\*\*Pydantic-based\*\***: Tất cả model đều dùng `pydantic.BaseModel` để validate dữ liệu

- **\*\*Async-first\*\***: Mọi thành phần đều hỗ trợ cả sync lẫn async

- **\*\*Library, không phải Service\*\***: Đây là thư viện được import vào ứng dụng, không phải dịch vụ độc lập

---

**## 2. Sơ đồ cấu trúc thư mục**

```

semantic-router/                    ← Thư mục gốc project

├── semantic\_router/                ← 📦 SOURCE CODE CHÍNH

│   ├── \_\_init\_\_.py                 ← Entry point, export các class chính

│   ├── route.py                    ← Định nghĩa Route (đơn vị routing)

│   ├── schema.py                   ← Data models dùng chung toàn project

│   ├── linear.py                   ← Thuật toán tính toán tương đồng (similarity)

│   ├── tokenizers.py               ← Bộ tách từ (tokenizer)

│   ├── py.typed                    ← Marker file cho type checking

│   ├── encoders/                   ← 🔤 Bộ mã hóa văn bản → vector

│   │   ├── base.py                 ← Base classes cho encoder

│   │   ├── openai.py               ← OpenAI encoder

│   │   ├── cohere.py               ← Cohere encoder

│   │   ├── huggingface.py          ← HuggingFace encoder

│   │   ├── ... (20+ files)         ← Các encoder khác

│   │   └── \_\_init\_\_.py             ← Export tất cả encoder

│   ├── index/                      ← 💾 Bộ lưu trữ & tìm kiếm vector

│   │   ├── base.py                 ← Base class cho index

│   │   ├── local.py                ← Lưu trong RAM

│   │   ├── pinecone.py             ← Lưu trên Pinecone cloud

│   │   ├── postgres.py             ← Lưu trong PostgreSQL

│   │   ├── qdrant.py               ← Lưu trên Qdrant

│   │   ├── hybrid\_local.py         ← Lưu hybrid (dense + sparse)

│   │   └── \_\_init\_\_.py             ← Export tất cả index

│   ├── routers/                    ← 🧠 Bộ điều phối trung tâm

│   │   ├── base.py                 ← BaseRouter (~1875 dòng, lõi logic)

│   │   ├── semantic.py             ← SemanticRouter (dùng dense encoding)

│   │   ├── hybrid.py               ← HybridRouter (dense + sparse)

│   │   └── \_\_init\_\_.py             ← Export các router

│   ├── llms/                       ← 🤖 Tích hợp LLM cho dynamic routes

│   │   ├── base.py                 ← Base class cho LLM

│   │   ├── openai.py               ← OpenAI LLM

│   │   ├── cohere.py               ← Cohere LLM

│   │   ├── llamacpp.py             ← LlamaCpp (local LLM)

│   │   └── ...                     ← Các LLM khác

│   └── utils/                      ← 🔧 Tiện ích dùng chung

│       ├── logger.py               ← Hệ thống logging có màu

│       ├── defaults.py             ← Cấu hình mặc định cho encoder

│       └── function\_call.py        ← Xử lý function calling

├── tests/                          ← 🧪 Bộ kiểm thử

│   ├── unit/                       ← Test từng thành phần riêng lẻ

│   ├── functional/                 ← Test tương tác giữa các thành phần

│   └── integration/                ← Test với dịch vụ bên ngoài thực

├── docs/                           ← 📖 Tài liệu & ví dụ (Jupyter notebooks)

├── pyproject.toml                  ← ⚙️ Cấu hình project & dependencies

├── Makefile                        ← 🛠 Các lệnh build/test/lint

└── .github/                        ← CI/CD workflows

```

---

**## 3. Giải thích chi tiết từng folder**

**### 3.1. semantic\_router — Source code chính**

**#### Phụ thuộc (dependency graph):**

```

utils/ ← không phụ thuộc ai (nền tảng)

  ↑

schema.py ← phụ thuộc utils

  ↑

linear.py ← độc lập (thuần toán học)

  ↑

route.py ← phụ thuộc schema, llms, utils

  ↑

encoders/ ← phụ thuộc schema, route

  ↑

index/ ← phụ thuộc schema, route, linear

  ↑

routers/ ← PHỤ THUỘC TẤT CẢ (tầng cao nhất)

```

---

**### 3.2. encoders — Bộ mã hóa**

**\*\*Dùng để làm gì?\*\*** Chuyển văn bản (hoặc hình ảnh) thành dãy số (vector) để so sánh ý nghĩa.

**\*\*Chứa loại code gì?\*\*** Các adapter pattern kết nối với API AI bên ngoài.

**\*\*Cấu trúc kế thừa:\*\***

```

DenseEncoder (base.py)           SparseEncoder (base.py)

├── OpenAIEncoder                ├── BM25Encoder

├── CohereEncoder                ├── TfidfEncoder

├── HuggingFaceEncoder           ├── AurelioSparseEncoder

├── GoogleEncoder                └── LocalSparseEncoder

├── BedrockEncoder

├── MistralEncoder

├── JinaEncoder

├── VoyageEncoder

├── OllamaEncoder

├── LiteLLMEncoder

├── FastEmbedEncoder

├── CLIPEncoder (hình ảnh)

├── VitEncoder (hình ảnh)

├── NimEncoder

├── AzureOpenAIEncoder

└── LocalEncoder

```

**\*\*Mixins bổ sung (trong base.py):\*\***

- `FittableMixin` — cho encoder cần "huấn luyện" trước (BM25, TF-IDF)

- `AsymmetricDenseMixin` — encoder dùng vector khác nhau cho query vs document (Jina)

- `AsymmetricSparseMixin` — tương tự cho sparse encoder

**\*\*Phụ thuộc:\*\*** schema.py (SparseEmbedding), route.py (Route — cho FittableMixin)

---

**### 3.3. index — Bộ lưu trữ & tìm kiếm**

**\*\*Dùng để làm gì?\*\*** Lưu trữ các vector đã encode và thực hiện tìm kiếm nhanh khi có query mới.

| File | Vai trò | Nơi lưu dữ liệu |

|------|---------|------------------|

| base.py | Abstract base (~620 dòng), định nghĩa interface | — |

| local.py | Lưu trong RAM bằng numpy array | Bộ nhớ máy |

| hybrid\_local.py | Như local nhưng hỗ trợ dense + sparse | Bộ nhớ máy |

| pinecone.py | Kết nối Pinecone cloud | Pinecone servers |

| postgres.py | Lưu trong PostgreSQL (pgvector) | PostgreSQL DB |

| qdrant.py | Kết nối Qdrant vector DB | Qdrant server |

**\*\*Phụ thuộc:\*\*** linear.py (hàm similarity\_matrix), schema.py, route.py

**\*\*Ví dụ minh họa tìm kiếm trong LocalIndex:\*\***

```python

# Khi query đến, LocalIndex thực hiện:

sim = similarity\_matrix(query\_vector, self.index)  # tính cosine similarity

scores, idx = top\_scores(sim, top\_k=5)              # lấy top 5 kết quả

```

---

**### 3.4. routers — Bộ não trung tâm**

**\*\*Đây là thành phần QUAN TRỌNG NHẤT\*\*** — nơi kết nối tất cả lại.

| File | Dòng code | Vai trò |

|------|-----------|---------|

| base.py | ~1875 | **\*\*Core logic\*\***: init, `\_\_call\_\_`, sync, scoring, config I/O |

| semantic.py | ~179 | Router dùng chỉ dense encoding |

| hybrid.py | ~709 | Router kết hợp dense + sparse encoding |

**\*\*Phụ thuộc:\*\*** TẤT CẢ các module khác (encoders, index, llms, route, schema, utils)

**\*\*Class hierarchy:\*\***

```

BaseModel (pydantic)

  └── BaseRouter (base.py)         ← ~1875 dòng core logic

        ├── SemanticRouter          ← Override \_encode(), sử dụng DenseEncoder

        └── HybridRouter            ← Override \_encode(), dùng Dense + Sparse

```

---

**### 3.5. llms — Tích hợp LLM**

**\*\*Dùng để làm gì?\*\*** CHỈ dùng cho **\*\*dynamic routes\*\*** — khi cần trích xuất tham số từ câu hỏi.

| File | LLM | Ghi chú |

|------|-----|---------|

| base.py | BaseLLM | Abstract base, định nghĩa `\_\_call\_\_`, `extract\_function\_inputs` |

| openai.py | OpenAILLM | GPT-4o mặc định |

| cohere.py | CohereLLM | Cohere Command |

| llamacpp.py | LlamaCppLLM | Chạy local |

| mistral.py | MistralAILLM | Mistral AI |

| ollama.py | OllamaLLM | Ollama local |

| openrouter.py | OpenRouterLLM | OpenRouter proxy |

| zure.py | AzureOpenAILLM | Azure OpenAI |

**\*\*Phụ thuộc:\*\*** schema.py (Message)

---

**### 3.6. utils — Tiện ích**

| File | Vai trò | Ai gọi? |

|------|---------|---------|

| logger.py | Logging có màu sắc | **\*\*Mọi file\*\*** trong project |

| defaults.py | Tên model mặc định cho từng encoder | base.py, các encoder |

| function\_call.py | Tạo function schema từ Python function | route.py (dynamic routes) |

---

**### 3.7. tests — Kiểm thử**

```

tests/

├── conftest.py       ← Fixtures dùng chung cho tất cả test

├── unit/             ← Test từng class riêng lẻ (mock API calls)

├── functional/       ← Test tương tác giữa các component

└── integration/      ← Test với API/dịch vụ thật (cần API key)

```

---

**## 4. Giải thích từng file quan trọng**

**### 4.1. \_\_init\_\_.py**

```python

from semantic\_router.route import Route

from semantic\_router.routers import HybridRouter, RouterConfig, SemanticRouter

\_\_all\_\_ = ["SemanticRouter", "HybridRouter", "Route", "RouterConfig"]

```

**\*\*Vai trò:\*\*** Entry point — chỉ export 4 class chính mà người dùng cần.

**\*\*Ảnh hưởng:\*\*** Quyết định public API của thư viện. Khi `from semantic\_router import Route`, Python sẽ chạy file này.

**### 4.2. route.py (~264 dòng)**

**\*\*Vai trò:\*\*** Định nghĩa `Route` class — đơn vị nhỏ nhất của routing.

**\*\*Được gọi từ:\*\*** base.py, base.py, base.py

**\*\*Tính năng quan trọng:\*\***

- `\_\_call\_\_()` — Khi route được kích hoạt, nếu có function\_schema → gọi LLM trích xuất tham số

- `from\_dynamic\_route()` — Tự động tạo route từ Python function bằng LLM

- `to\_dict()` / `from\_dict()` — Serialize/deserialize cho lưu trữ

**### 4.3. schema.py (~599 dòng)**

**\*\*Vai trò:\*\*** Tất cả data model dùng chung. File "từ điển" của project.

**\*\*Classes quan trọng:\*\***

| Class | Dùng cho |

|-------|----------|

| `RouteChoice` | Kết quả trả về khi router quyết định route |

| `Message` | Tin nhắn gửi đến LLM (role + content) |

| `Utterance` | Một cặp (route, câu mẫu) + metadata |

| `UtteranceDiff` | So sánh sự khác biệt giữa local và remote index |

| `SparseEmbedding` | Biểu diễn vector thưa (sparse) |

| `ConfigParameter` | Metadata cấu hình (hash, lock...) |

| `EncoderType` | Enum liệt kê tất cả loại encoder |

| `SyncMode` | Enum các chế độ đồng bộ (local, remote, merge...) |

**\*\*Ảnh hưởng:\*\*** Hầu như MỌI file đều import từ schema.py.

**### 4.4. linear.py (~37 dòng)**

**\*\*Vai trò:\*\*** Thuật toán toán học thuần túy — tính cosine similarity.

**\*\*Chỉ 2 hàm:\*\***

- `similarity\_matrix(xq, index)` — Tính điểm tương đồng giữa query vector và tất cả vector trong index

- `top\_scores(sim, top\_k)` — Lấy top-k kết quả cao nhất

**\*\*Được gọi từ:\*\*** local.py, `index/hybrid\_local.py`

**\*\*Ảnh hưởng:\*\*** Đây là "trái tim toán học" — quyết định độ chính xác của routing.

**### 4.5. base.py (~1875 dòng)**

**\*\*File LỚN NHẤT và QUAN TRỌNG NHẤT trong toàn project.\*\***

**\*\*Chứa 2 class chính:\*\***

**\*\*****`RouterConfig`****\*\*** — Quản lý cấu hình:

- `from\_file()` / `to\_file()` — Load/save config từ JSON/YAML

- `from\_index()` — Tạo config từ index đã có

- `get\_hash()` — Tạo hash để kiểm tra đồng bộ

**\*\*****`BaseRouter`****\*\*** — Lõi logic routing:

| Method | Dòng | Chức năng |

|--------|------|-----------|

| `\_\_init\_\_()` | 380-440 | Khởi tạo: set encoder, index, threshold, sync |

| `\_\_call\_\_()` | 590-640 | **\*\*ENTRY POINT chính\*\*** — nhận text, trả route |

| `acall()` | 800-840 | Phiên bản async của `\_\_call\_\_` |

| `\_score\_routes()` | — | Tính điểm trung bình cho mỗi route từ top-k scores |

| `\_pass\_routes()` | 650-700 | Lọc routes vượt ngưỡng, gọi dynamic route nếu cần |

| `sync()` | 850-900 | Đồng bộ local ↔ remote index |

| `\_execute\_sync\_strategy()` | 970-1000 | Thực thi chiến lược sync (upsert/delete) |

| `fit()` | — | Tối ưu score threshold bằng training data |

| `evaluate()` | — | Đánh giá accuracy của router |

**### 4.6. openai.py (~243 dòng)**

**\*\*Vai trò:\*\*** Encoder phổ biến nhất — gọi OpenAI API để tạo embedding.

**\*\*Được gọi từ:\*\*** base.py (là default encoder)

**\*\*Đặc điểm:\*\***

- Tự động cắt text nếu vượt token limit

- Retry logic khi API lỗi

- Hỗ trợ cả sync và async client

---

**## 5. Luồng chạy chính**

**### Luồng 1: Khởi tạo Router (một lần duy nhất)**

```

Người dùng gọi: router = SemanticRouter(encoder=enc, routes=[r1, r2])

       │

       ▼

  ┌──────────────────────────────────────────────────────────┐

  │  SemanticRouter.\_\_init\_\_()  [semantic.py]                │

  │    ├── \_get\_index() → tạo LocalIndex nếu không truyền   │

  │    ├── \_get\_encoder() → dùng OpenAIEncoder nếu không có │

  │    └── super().\_\_init\_\_() → gọi BaseRouter.\_\_init\_\_()    │

  └──────────────────────────┬───────────────────────────────┘

                             ▼

  ┌──────────────────────────────────────────────────────────┐

  │  BaseRouter.\_\_init\_\_()  [routers/base.py:380]            │

  │    ├── \_set\_score\_threshold()                            │

  │    │     └── Lấy threshold từ encoder (vd: 0.3 cho      │

  │    │         text-embedding-3-small)                     │

  │    ├── \_set\_aggregation\_method()                         │

  │    │     └── Chọn mean/sum/max cho scoring               │

  │    └── \_init\_index\_state() ─────────────────────────┐    │

  └─────────────────────────────────────────────────────┼────┘

                                                        ▼

  ┌──────────────────────────────────────────────────────────┐

  │  \_init\_index\_state()                                     │

  │    ├── encoder(["test"]) → lấy dimensions (vd: 1536)     │

  │    ├── Nếu auto\_sync="local":                            │

  │    │     ├── Lấy local\_utterances từ routes              │

  │    │     ├── Lấy remote\_utterances từ index              │

  │    │     ├── UtteranceDiff.from\_utterances()             │

  │    │     │     └── So sánh 2 danh sách bằng difflib      │

  │    │     ├── diff.get\_sync\_strategy("local")             │

  │    │     └── \_execute\_sync\_strategy()                    │

  │    │           ├── Encode tất cả utterances → vectors    │

  │    │           └── index.add(vectors, routes, utterances)│

  │    └── Ghi hash mới vào index                            │

  └──────────────────────────────────────────────────────────┘

```

**### Luồng 2: Xử lý Query (mỗi lần người dùng hỏi)**

```

Người dùng gọi: result = router("Sản phẩm bị hỏng rồi!")

       │

       ▼

  ┌──────────────────────────────────────────────────────────┐

  │  BaseRouter.\_\_call\_\_()  [routers/base.py:590]            │

  │    │                                                     │

  │    ├── 1. Kiểm tra index.is\_ready()                      │

  │    │                                                     │

  │    ├── 2. \_encode(text=["Sản phẩm bị hỏng rồi!"],       │

  │    │         input\_type="queries")                       │

  │    │     └── SemanticRouter.\_encode() [semantic.py]      │

  │    │           └── encoder(["Sản phẩm bị hỏng rồi!"])   │

  │    │                 └── OpenAI API call                  │

  │    │                       └── Returns: [0.012, -0.34,   │

  │    │                            0.78, ...] (1536 số)     │

  │    │                                                     │

  │    ├── 3. xq\_reshape(vector)                             │

  │    │     └── Đảm bảo shape (1, 1536)                     │

  │    │                                                     │

  │    ├── 4. index.query(vector, top\_k=5)                   │

  │    │     └── LocalIndex.query() [index/local.py]         │

  │    │           ├── similarity\_matrix() [linear.py]       │

  │    │           │     └── cosine\_sim = dot(v, index) /    │

  │    │           │           (norm(v) \* norm(index))       │

  │    │           ├── top\_scores(sim, k=5)                  │

  │    │           └── Returns: (scores, route\_names)        │

  │    │              vd: ([0.89, 0.87, 0.85, 0.42, 0.38],  │

  │    │                   ["khieu\_nai","khieu\_nai",          │

  │    │                    "khieu\_nai","hoi\_gia","dat\_hang"])│

  │    │                                                     │

  │    ├── 5. \_score\_routes(query\_results)                   │

  │    │     └── Gộp điểm theo route:                        │

  │    │         "khieu\_nai": mean(0.89,0.87,0.85) = 0.87   │

  │    │         "hoi\_gia":   mean(0.42) = 0.42              │

  │    │         "dat\_hang":  mean(0.38) = 0.38              │

  │    │                                                     │

  │    └── 6. \_pass\_routes(scored\_routes)                    │

  │          ├── Sắp xếp: khieu\_nai(0.87) > hoi\_gia(0.42)  │

  │          ├── So ngưỡng: 0.87 >= 0.3 (threshold) ✓       │

  │          ├── Tìm Route matching: routes["khieu\_nai"]     │

  │          ├── Nếu có function\_schema → gọi route(query)  │

  │          │     └── LLM trích xuất tham số                │

  │          └── Return RouteChoice(name="khieu\_nai",        │

  │                   similarity\_score=0.87)                 │

  └──────────────────────────────────────────────────────────┘

       │

       ▼

  result.name = "khieu\_nai"  ← Kết quả cuối cùng

```

**### Luồng 3: Dynamic Route (có function calling)**

```

Route: bao\_thuc (có function\_schema)

Query: "Đặt báo thức lúc 7 giờ sáng"

       │

       ▼  (Sau khi qua luồng 2, route "bao\_thuc" được chọn)

  ┌──────────────────────────────────────────────────────────┐

  │  route.\_\_call\_\_(query="Đặt báo thức lúc 7 giờ sáng")   │

  │  [route.py:80]                                           │

  │    ├── Có function\_schemas → cần LLM                     │

  │    ├── llm.extract\_function\_inputs(                      │

  │    │     query="Đặt báo thức lúc 7 giờ sáng",           │

  │    │     function\_schemas=[{set\_alarm: {time: str}}]     │

  │    │   )                                                 │

  │    │   └── Gọi OpenAI/Cohere/... để parse tham số       │

  │    │         └── Returns: [{"function\_name": "set\_alarm",│

  │    │                        "arguments": {"time":"7:00AM"│

  │    │                       }}]                           │

  │    └── Return RouteChoice(                               │

  │          name="bao\_thuc",                                │

  │          function\_call=[{"function\_name":"set\_alarm",    │

  │                         "arguments":{"time":"7:00AM"}}]  │

  │        )                                                 │

  └──────────────────────────────────────────────────────────┘

```

**### Luồng 4: Sync (đồng bộ local ↔ remote)**

```

router.sync(sync\_mode="local")

       │

       ▼

  ┌──────────────────────────────────────────────────────────┐

  │  1. index.lock(value=True)   ← Khóa index tránh xung đột│

  │  2. Lấy local\_utterances    ← Từ router.routes          │

  │  3. Lấy remote\_utterances   ← Từ index (Pinecone/PG)    │

  │  4. UtteranceDiff.from\_utterances(local, remote)         │

  │     └── Dùng difflib.Differ() so sánh 2 danh sách       │

  │         Mỗi utterance có tag: " " (giống), "+" (remote   │

  │         thừa), "-" (local thừa)                          │

  │  5. diff.get\_sync\_strategy("local")                      │

  │     └── mode="local" → push local lên remote:            │

  │         remote.upsert = local\_only items                  │

  │         remote.delete = remote\_only items                 │

  │  6. \_execute\_sync\_strategy()                              │

  │     ├── Delete remote items không có ở local              │

  │     └── Upsert local items lên remote                     │

  │  7. index.lock(value=False)  ← Mở khóa                   │

  └──────────────────────────────────────────────────────────┘

```

---

**## Tóm tắt kiến trúc bằng ví dụ dễ hiểu**

Hãy tưởng tượng project như một **\*\*bưu điện thông minh\*\***:

| Thành phần | Ví dụ tương đương |

|------------|-------------------|

| **\*\*Route\*\*** | Các **\*\*ô thư\*\*** (ô "khiếu nại", ô "đặt hàng"...) kèm mẫu thư ví dụ |

| **\*\*Encoder\*\*** | **\*\*Người đọc thư\*\*** — đọc nội dung và tóm tắt thành mã số |

| **\*\*Index\*\*** | **\*\*Tủ lưu trữ\*\*** — giữ tất cả mã số của các mẫu thư, hỗ trợ tra nhanh |

| **\*\*Router\*\*** | **\*\*Tổng đài viên\*\*** — nhận thư mới, đưa cho người đọc, tra tủ, rồi quyết định bỏ vào ô nào |

| **\*\*LLM\*\*** | **\*\*Chuyên gia phân tích\*\*** — chỉ được gọi khi thư phức tạp cần trích xuất thông tin chi tiết |

| **\*\*linear.py\*\*** | **\*\*Thước đo khoảng cách\*\*** — đo xem mã số thư mới "gần" ô nào nhất |

Khi có thư mới → Tổng đài viên (Router) đưa cho người đọc (Encoder) → Nhận mã số → Dùng thước đo (linear.py) tra trong tủ (Index) → Tìm ô gần nhất (Route) → Bỏ thư vào ô đó. Toàn bộ quá trình mất **\*\*dưới 10ms\*\***.

Completed: *\*Write comprehensive analysis\** (7/7)
