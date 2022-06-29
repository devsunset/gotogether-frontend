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
                                        <th>User</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                        <td>John Doe</td>
                                        <td>11-7-2014</td>
                                    </tr>
                                    <tr>
                                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                        <td>Alexander Pierce</td>
                                        <td>11-7-2014</td>
                                    </tr>
                                    <tr>
                                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                        <td>Bob Doe</td>
                                        <td>11-7-2014</td>
                                    </tr>
                                    <tr>
                                        <td>Bacon ipsum dolor sit amet salami venison chicken flank fatback doner.</td>
                                        <td>Mike Doe</td>
                                        <td>11-7-2014</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
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