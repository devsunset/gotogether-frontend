<template>
<!-- Content Header (Page header) -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1 class="m-0">Talk</h1>
            </div>
            <!-- /.col -->
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item">
                        <router-link to="/">Home</router-link>
                    </li>
                    <li class="breadcrumb-item active">Talk</li>
                </ol>
            </div>
            <!-- /.col -->
        </div>
        <!-- /.row -->
    </div>
    <!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div>
            <div class="col-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title"></h3>
                            <div class="card-tools">
                                <div class="input-group input-group-sm" style="width: 270px;">
                                    <input type="text" name="table_search" class="form-control float-right" placeholder="Search">
                                    <div class="input-group-append">
                                        <button type="submit" class="btn btn-default">
                                            <i class="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="card-body table-responsive p-0">
                            <table class="table table-hover text-nowrap">
                                <thead>
                                    <tr>
                                        <th>Talk</th>
                                        <th style="width: 5%">User</th>
                                        <th style="width: 5%">Date</th>
                                        <th style="width: 5%">Reply</th>
                                        <th style="width: 5%">View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>자유로운 이야기 ~ 1</td>
                                        <td>devsunset</td>
                                        <td>22-06-29 11:00</td>
                                        <td>0</td>
                                        <td>11</td>
                                    </tr>
                                    <tr>
                                        <td>자유로운 이야기 ~ 2</td>
                                        <td>devsunset</td>
                                        <td>22-06-29 10:30</td>
                                        <td>1</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>자유로운 이야기 ~ 3</td>
                                        <td>devsunset</td>
                                        <td>22-06-29 10:00</td>
                                        <td>5</td>
                                        <td>31</td>
                                    </tr>
                                    <tr>
                                        <td>자유로운 이야기 ~ 3</td>
                                        <td>devsunset</td>
                                        <td>22-06-29 09:00</td>
                                        <td>9</td>
                                        <td>99</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                        <div class="card-footer clearfix">
                            <ul class="pagination pagination-sm m-0 float-right">
                                <li class="page-item"><a class="page-link" href="#">«</a></li>
                                <li class="page-item"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item"><a class="page-link" href="#">»</a></li>
                            </ul>
                        </div>
                </div>
        </div>
    </div>
    <!-- /.container-fluid -->
</section>
<!-- /.content -->
</template>

<script>
export default {
  name: "talk",
  data() {
    return {
      content: "",
      width: 0,
      height: 0
    };
  },
};
</script>

<style>

</style>