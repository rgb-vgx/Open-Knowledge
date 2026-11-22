# MỤC LỤC — Mastering GPU Parallel Programming with CUDA

> Nguồn: [Udemy](https://viettel.udemy.com/course/mastering-gpu-parallel-programming-with-cuda)

## 01. Introduction to the Nvidia GPUs hardware

- [001 - GPU vs CPU (very important)](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/001%20-%20GPU%20vs%20CPU%20(very%20important).md)
- [002 - NVidia's history (How Nvidia started dominating the GPU sector)](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/002%20-%20NVidia%27s%20history%20(How%20Nvidia%20started%20dominating%20the%20GPU%20sector).md)
- [003 - Architectures and Generations relationship [Hopper, Ampere, GeForce an](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/003%20-%20Architectures%20and%20Generations%20relationship%20%5BHopper%2C%20Ampere%2C%20GeForce%20an.md)
- [004 - How to know the Architecture and Generation](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/004%20-%20How%20to%20know%20the%20Architecture%20and%20Generation.md)
- [005 - The difference between the GPU and the GPU Chip](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/005%20-%20The%20difference%20between%20the%20GPU%20and%20the%20GPU%20Chip.md)
- [006 - The architectures and the corresponding chips](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/006%20-%20The%20architectures%20and%20the%20corresponding%20chips.md)
- [007 - Nvidia GPU architectures From Fermi to hopper](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/007%20-%20Nvidia%20GPU%20architectures%20From%20Fermi%20to%20hopper.md)
- [008 - Parameters required to compare between different Architectures](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/008%20-%20Parameters%20required%20to%20compare%20between%20different%20Architectures.md)
- [009 - Half, single and double precision operations](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/009%20-%20Half%2C%20single%20and%20double%20precision%20operations.md)
- [010 - Compute capability and utilizations of the GPUs](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/010%20-%20Compute%20capability%20and%20utilizations%20of%20the%20GPUs.md)
- [011 - Before reading any whitepapers !! look at this](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/011%20-%20Before%20reading%20any%20whitepapers%20%21%21%20look%20at%20this.md)
- [012 - Volta+Ampere+Pascal+SIMD (Don't skip)](01.%20Introduction%20to%20the%20Nvidia%20GPUs%20hardware/012%20-%20Volta%2BAmpere%2BPascal%2BSIMD%20(Don%27t%20skip).md)

## 02. Installing Cuda and other programs

- [013 - What features installed with the CUDA toolkit](02.%20Installing%20Cuda%20and%20other%20programs/013%20-%20What%20features%20installed%20with%20the%20CUDA%20toolkit.md)
- [014 - Installing CUDA on Windows](02.%20Installing%20Cuda%20and%20other%20programs/014%20-%20Installing%20CUDA%20on%20Windows.md)
- [015 - Installing WSL to use Linux on windows OS](02.%20Installing%20Cuda%20and%20other%20programs/015%20-%20Installing%20WSL%20to%20use%20Linux%20on%20windows%20OS.md)
- [016 - Installing Cuda toolkits on Linux](02.%20Installing%20Cuda%20and%20other%20programs/016%20-%20Installing%20Cuda%20toolkits%20on%20Linux.md)

## 03. Introduction to CUDA programming

- [018 - Mapping SW from CUDA to HW + introducing CUDA](03.%20Introduction%20to%20CUDA%20programming/018%20-%20Mapping%20SW%20from%20CUDA%20to%20HW%20%2B%20introducing%20CUDA.md)
- [019 - 001 Hello World program (threads - Blocks)](03.%20Introduction%20to%20CUDA%20programming/019%20-%20001%20Hello%20World%20program%20(threads%20-%20Blocks).md)
- [020 - Compiling Cuda on Linux](03.%20Introduction%20to%20CUDA%20programming/020%20-%20Compiling%20Cuda%20on%20Linux.md)
- [021 - 002 Hello World program ( Warp_IDs)](03.%20Introduction%20to%20CUDA%20programming/021%20-%20002%20Hello%20World%20program%20(%20Warp_IDs).md)
- [022 - 003 - Vector addition + the Steps for any CUDA project](03.%20Introduction%20to%20CUDA%20programming/022%20-%20003%20-%20Vector%20addition%20%2B%20the%20Steps%20for%20any%20CUDA%20project.md)
- [023 - 004 - Vector addition + blocks and thread indexing + GPU performance](03.%20Introduction%20to%20CUDA%20programming/023%20-%20004%20-%20Vector%20addition%20%2B%20blocks%20and%20thread%20indexing%20%2B%20GPU%20performance.md)
- [024 - 005 levels of parallelization - Vector addition with Extra-large vecto](03.%20Introduction%20to%20CUDA%20programming/024%20-%20005%20levels%20of%20parallelization%20-%20Vector%20addition%20with%20Extra-large%20vecto.md)

## 04. Profiling

- [025 - Query the device properties using the Runtime APIs](04.%20Profiling/025%20-%20Query%20the%20device%20properties%20using%20the%20Runtime%20APIs.md)
- [026 - Nvidia-smi and its configurations (Linux User)](04.%20Profiling/026%20-%20Nvidia-smi%20and%20its%20configurations%20(Linux%20User).md)
- [027 - The GPU's Occupancy and Latency hiding](04.%20Profiling/027%20-%20The%20GPU%27s%20Occupancy%20and%20Latency%20hiding.md)
- [028 - Allocated active blocks per SM (important)](04.%20Profiling/028%20-%20Allocated%20active%20blocks%20per%20SM%20(important).md)
- [029 - Quiz 1- how many blocks can we run concurrently per SM](04.%20Profiling/029%20-%20Quiz%201-%20how%20many%20blocks%20can%20we%20run%20concurrently%20per%20SM.md)
- [030 - Starting with the nsight compute (first issue)](04.%20Profiling/030%20-%20Starting%20with%20the%20nsight%20compute%20(first%20issue).md)
- [031 - All profiling tools from NVidia (Nsight systems - compute - nvprof](04.%20Profiling/031%20-%20All%20profiling%20tools%20from%20NVidia%20(Nsight%20systems%20-%20compute%20-%20nvprof.md)
- [032 - Error checking APIs](04.%20Profiling/032%20-%20Error%20checking%20APIs.md)
- [033 - Nsight Compute performance using command line analysis](04.%20Profiling/033%20-%20Nsight%20Compute%20performance%20using%20command%20line%20analysis.md)
- [034 - Graphical Nsight Compute (windows and linux)](04.%20Profiling/034%20-%20Graphical%20Nsight%20Compute%20(windows%20and%20linux).md)

## 05. Performance analysis for the previous applications

- [035 - Performance analysis](05.%20Performance%20analysis%20for%20the%20previous%20applications/035%20-%20Performance%20analysis.md)
- [036 - Vector addition with a size not power of 2 !!! important](05.%20Performance%20analysis%20for%20the%20previous%20applications/036%20-%20Vector%20addition%20with%20a%20size%20not%20power%20of%202%20%21%21%21%20important.md)

## 06. 2D Indexing

- [037 - Matrices addition using 2D of blocks and threads](06.%202D%20Indexing/037%20-%20Matrices%20addition%20using%202D%20of%20blocks%20and%20threads.md)
- [038 - Why L1 Hit-rate is zero](06.%202D%20Indexing/038%20-%20Why%20L1%20Hit-rate%20is%20zero.md)

## 07. Shared Memory + Warp Divergence

- [039 - The shared memory](07.%20Shared%20Memory%20%2B%20Warp%20Divergence/039%20-%20The%20shared%20memory.md)
- [041 - Warp Divergence](07.%20Shared%20Memory%20%2B%20Warp%20Divergence/041%20-%20Warp%20Divergence.md)

## 08. Debugging tools

- [042 - Debugging using visual studio (important) 1](08.%20Debugging%20tools/042%20-%20Debugging%20using%20visual%20studio%20(important)%201.md)

## 09. Vector Reduction

- [043 - Vector Reduction using global memory only (baseline)](09.%20Vector%20Reduction/043%20-%20Vector%20Reduction%20using%20global%20memory%20only%20(baseline).md)
- [044 - Understanding the code and the profiling of the vector reduction](09.%20Vector%20Reduction/044%20-%20Understanding%20the%20code%20and%20the%20profiling%20of%20the%20vector%20reduction.md)
- [045 - Optimizing the vector reduction (removing the filter)](09.%20Vector%20Reduction/045%20-%20Optimizing%20the%20vector%20reduction%20(removing%20the%20filter).md)
- [046 - The Race Condition and the debugging option](09.%20Vector%20Reduction/046%20-%20The%20Race%20Condition%20and%20the%20debugging%20option.md)
- [047 - Optimizing the thread utilizations on vector reduction](09.%20Vector%20Reduction/047%20-%20Optimizing%20the%20thread%20utilizations%20on%20vector%20reduction.md)
- [048 - Optimization using shared memory and unrolling](09.%20Vector%20Reduction/048%20-%20Optimization%20using%20shared%20memory%20and%20unrolling.md)
- [049 - Shuffle operations optimizations](09.%20Vector%20Reduction/049%20-%20Shuffle%20operations%20optimizations.md)

## 10. Roofline model

- [050 - Roofline Analysis -(Compute and Memory bounds apps)](10.%20Roofline%20model/050%20-%20Roofline%20Analysis%20-(Compute%20and%20Memory%20bounds%20apps).md)

## 11. Matrix Multiplication (Bonus)

- [051 - Naive implementation of the matrix multiplication](11.%20Matrix%20Multiplication%20(Bonus)/051%20-%20Naive%20implementation%20of%20the%20matrix%20multiplication.md)
- [052 - Optimize the Matrix Multiplication using the shared memory](11.%20Matrix%20Multiplication%20(Bonus)/052%20-%20Optimize%20the%20Matrix%20Multiplication%20using%20the%20shared%20memory.md)
- [053 - Optimization of the MM using float4 (important)](11.%20Matrix%20Multiplication%20(Bonus)/053%20-%20Optimization%20of%20the%20MM%20using%20float4%20(important).md)
- [054 - Tiling in matrix multiplication](11.%20Matrix%20Multiplication%20(Bonus)/054%20-%20Tiling%20in%20matrix%20multiplication.md)
- [055 - The Tensor cores (introduction)](11.%20Matrix%20Multiplication%20(Bonus)/055%20-%20The%20Tensor%20cores%20(introduction).md)
- [056 - Practical evaluation of the tensor cores](11.%20Matrix%20Multiplication%20(Bonus)/056%20-%20Practical%20evaluation%20of%20the%20tensor%20cores.md)
- [057 - Programming the Tensor cores using WMMA APIs](11.%20Matrix%20Multiplication%20(Bonus)/057%20-%20Programming%20the%20Tensor%20cores%20using%20WMMA%20APIs.md)
- [058 - Practical example on the WMMA APIs](11.%20Matrix%20Multiplication%20(Bonus)/058%20-%20Practical%20example%20on%20the%20WMMA%20APIs.md)
- [059 - Programming the Tensor cores using CUBlas library](11.%20Matrix%20Multiplication%20(Bonus)/059%20-%20Programming%20the%20Tensor%20cores%20using%20CUBlas%20library.md)

## Bài đã bỏ

- `03 - Introduction to CUDA programming/017 - The course github repo.md` — Không tìm thấy transcript (bài chỉ có link repo)
- `07 - Shared Memory + Warp Divergence/040 - Quiz 2- Quiz 1.md` — Transcript trùng 100% với bài 039 (video quiz không có nội dung riêng)
- `12 - Profiling - nsight systems/060 - NVIDIA Nsight Copilot.md` — Không tìm thấy transcript
